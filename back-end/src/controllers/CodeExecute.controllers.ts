import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MAX_CONCURRENT_EXECUTIONS, MAX_QUEUE_SIZE } from "../config/constants";
import { executeCode } from "../utils/executeCode";
import {
  ICodeSubmission,
  IQueueIdSet,
  ISubmissionDatabase,
  ISubmissionQueueItem,
} from "../utils/validationSchema";

// In-memory queue and database
const queue: ISubmissionQueueItem[] = [];
const queue_id_set: IQueueIdSet = {};
const submission_database: ISubmissionDatabase = {};
let active_executions = 0;

export const getCodeOutput = async (submission: ICodeSubmission) => {
  const { id, language, code, input } = submission;
  try {
    const output = await executeCode(code, language, input);

    return output;
  } catch (err: any) {
    throw new Error(JSON.stringify({ error: err }));
  }
};

export const submitCode = async (req: Request, res: Response) => {
  const { language, code, input } = req.body as ICodeSubmission;
  const id = uuidv4();
  if (queue.length >= MAX_QUEUE_SIZE) {
    return res.status(400).send({
      output: "",
      error: "Server overloaded, please try again later!",
    });
  }
  queue.push({ id, language, code, input });
  queue_id_set[id] = true;
  res.status(202).send({ message: "Submission received", id });

  // Process queue submissions
  processQueue();
};

// Process queue submissions
const processQueue = async () => {
  while (queue.length > 0 && active_executions < MAX_CONCURRENT_EXECUTIONS) {
    active_executions++;
    const submission: ISubmissionQueueItem | undefined = queue.shift();
    if (submission) {
      try {
        const output: any = await getCodeOutput(submission);
        submission_database[submission.id] = {
          id: submission.id,
          status: "success",
          error: output.error,
          output: output.output,
          executionTime: output.executionTime,
          timestamp: new Date(),
        };
      } catch (error: any) {
        // console.log(error?.message);

        submission_database[submission.id] = {
          id: submission.id,
          output: "",
          status: "error",
          error: JSON.parse(error?.message).error,
          executionTime: 0,
          timestamp: new Date(),
        };
      }
      delete queue_id_set[submission.id];
    }
    active_executions--;
  }
};

export const getSubmissionStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const submission = submission_database[id];
  if (submission) {
    res.send(submission);
  } else if (queue_id_set[id]) {
    res
      .status(202)
      .send({ status: "pending", message: "Submission in queue!" });
  } else {
    res.status(404).send({ status: "error", message: "Something went wrong!" });
  }
};

// Evict old data from the database
const EVICTION_TIME: number = 30 * 60 * 1000;
const evictOldEntries = () => {
  const now = Date.now();
  for (const id in submission_database) {
    if (now - submission_database[id].timestamp.getTime() > EVICTION_TIME) {
      delete submission_database[id];
      console.log(`Evicted entry with ID: ${id}`);
    }
  }
};

// Set up periodic eviction
setInterval(evictOldEntries, EVICTION_TIME);
