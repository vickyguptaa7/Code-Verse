#include <bits/stdc++.h>
using namespace std;

#define MOD 1000000007

int add(int a, int b)
{
    return (a + b) % MOD;
}

int sub(int a, int b)
{
    return (a - b) % MOD;
}

class BIT
{
public:
    BIT(int n) : N(n)
    {
        bit = vector<int>(n + 1, 0);
    }

    void add(int i, int val)
    {
        i += 1;
        while (i < N)
        {
            bit[i] = (bit[i] + val) % MOD;
            i += (i & -i);
        }
    }

    int query(int i)
    {
        i += 1;
        int ret = 0;
        while (i > 0)
        {
            ret = (ret + bit[i]) % MOD;
            i -= (i & -i);
        }
        return ret;
    }

private:
    int N;
    vector<int> bit;
};

int hashh(unordered_map<int, int> &lookup, unordered_set<int> &h_set, int x)
{
    if (lookup.find(x) == lookup.end())
    {
        lookup[x] = rand() % MOD;
        h_set.insert(lookup[x]);
    }
    return lookup[x];
}

int perfectly_balanced_chapter_2()
{
    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; ++i)
    {
        cin >> A[i];
    }
    unordered_map<int, int> lookup;
    unordered_set<int> h_set;
    BIT bit(N);
    for (int i = 0; i < N; ++i)
    {
        bit.add(i, hashh(lookup, h_set, A[i]));
    }
    int result = 0;
    int Q;
    cin >> Q;
    for (int i = 0; i < Q; ++i)
    {
        int type, L, R, X, Y;
        cin >> type >> L >> R;
        --L;
        --R;
        if (type == 1)
        {
            cin >> Y;
            bit.add(L, -hashh(lookup, h_set, A[L]));
            A[L] = Y;
            bit.add(L, hashh(lookup, h_set, A[L]));
            continue;
        }
        if ((R - L + 1) % 2 == 0)
        {
            continue;
        }
        int h1 = sub(bit.query((L + R) / 2), bit.query(L - 1));
        int h2 = sub(bit.query(R), bit.query((L + R) / 2));
        if (h_set.find(sub(h1, h2)) != h_set.end())
        {
            ++result;
            continue;
        }
        h1 = sub(bit.query((L + R) / 2 - 1), bit.query(L - 1));
        h2 = sub(bit.query(R), bit.query((L + R) / 2 - 1));
        if (h_set.find(sub(h2, h1)) != h_set.end())
        {
            ++result;
            continue;
        }
    }
    return result;
}

int main()
{
    srand(0);
    int T;
    cin >> T;
    for (int i = 1; i <= T; ++i)
    {
        cout << "Case #" << i << ": " << perfectly_balanced_chapter_2() << endl;
    }
    return 0;
}
