export interface INotification {
  id: string;
  description: string;
  isWaitUntilComplete: boolean;
  type: "info" | "error" | "success";
}
