export type TemplateSourceKind = "Local" | "Reference" | "Influence";

export type TemplateSource = {
  name: string;
  kind: TemplateSourceKind;
  note: string;
};

export type TemplateItem = {
  id: string;
  title: string;
  category: string;
  language: string;
  level: "Core" | "Standard" | "Advanced";
  source: string;
  summary: string;
  complexity: string;
  tags: string[];
  code: string;
  notes?: string[];
  featured?: boolean;
};

export const templateSources: TemplateSource[] = [
  {
    name: "Curated by Chinmay",
    kind: "Local",
    note: "Handpicked contest essentials: base templates, searching, graphs, combinatorics, sieves, hashing, and matrix helpers.",
  },
  {
    name: "KACTL",
    kind: "Reference",
    note: "Dense contest implementations already converted into copy-ready snippets here.",
  },
  {
    name: "cp-algorithms",
    kind: "Reference",
    note: "Core data-structure, graph, string, and DP templates included directly in the library.",
  },
  {
    name: "USACO Guide",
    kind: "Reference",
    note: "Prefix sum and beginner-to-silver contest patterns stored as direct snippets.",
  },
  {
    name: "Tourist",
    kind: "Reference",
    note: "Lean C++ shells and case-loop patterns shaped from tourist's public algo templates.",
  },
  {
    name: "Benq",
    kind: "Reference",
    note: "Macro-rich contest headers and stress-testing workflow from Benq's public notebook style.",
  },
  {
    name: "Neal Wu",
    kind: "Reference",
    note: "Implementation-heavy data structure and modular templates converted into compact snippets.",
  },
  {
    name: "Errichto",
    kind: "Reference",
    note: "Contest-library classics: flow, satisfiability, FFT, and ACM-style reusable code.",
  },
  {
    name: "ecnerwala",
    kind: "Reference",
    note: "Clean generic reference-code patterns for advanced trees, sequences, and math.",
  },
  {
    name: "AtCoder Library",
    kind: "Reference",
    note: "ACL usage skeletons for official DSU, Fenwick, segtree, lazy segtree, flow, and convolution.",
  },
  {
    name: "Priyansh Agarwal",
    kind: "Influence",
    note: "Self-contained contest shell with utility helpers, modular power, and clean single-file flow.",
  },
  {
    name: "Teja-Smart",
    kind: "Influence",
    note: "Minimal fast C++23 shell focused on short implementation, direct state, and contest speed.",
  },
  {
    name: "aryanc403",
    kind: "Influence",
    note: "Recursion-first template built around local lambdas, PBDS, rng, and y_combinator usage.",
  },
  {
    name: "Jiangly",
    kind: "Influence",
    note: "Compact C++20 shell for terse solves, lambdas, and low ceremony contest code.",
  },
  {
    name: "ncduy0303",
    kind: "Reference",
    note: "MIT-style competitive programming library patterns converted into direct contest snippets.",
  },
];

export const templates: TemplateItem[] = [
  {
    id: "core-contest-template",
    title: "Core Contest Template",
    category: "Core",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Fast IO, aliases, modular helpers, debug printer, and a solve loop.",
    complexity: "Boilerplate",
    tags: ["template", "debug", "modular arithmetic", "fast io", "solve"],
    featured: true,
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

#define endl '\n'
#define int long long
#define vi vector<int>
#define vvi vector<vector<int>>
#define pi pair<int, int>
#define vpi vector<pair<int, int>>
#define all(v) (v).begin(), (v).end()
#define rall(v) (v).rbegin(), (v).rend()
#define yes cout << "YES" << endl
#define no cout << "NO" << endl

const int MOD = 1e9 + 7;
const int INF = LLONG_MAX >> 1;

int mod_add(int a, int b, int m = MOD) {
    return ((a % m) + (b % m) + m) % m;
}

int mod_mul(int a, int b, int m = MOD) {
    return ((a % m) * (b % m)) % m;
}

int binpow(int a, int b, int m = MOD) {
    int res = 1;
    while (b > 0) {
        if (b & 1) res = mod_mul(res, a, m);
        a = mod_mul(a, a, m);
        b >>= 1;
    }
    return res;
}

#ifndef ONLINE_JUDGE
#define debug(x) cerr << #x << " = "; _print(x); cerr << endl
template <class T> void _print(const T &x) { cerr << x; }
template <class A, class B> void _print(const pair<A, B> &p) {
    cerr << "{"; _print(p.first); cerr << ", "; _print(p.second); cerr << "}";
}
template <class T> void _print(const vector<T> &v) {
    cerr << "[ ";
    for (const T &x : v) _print(x), cerr << ' ';
    cerr << "]";
}
#else
#define debug(x)
#endif

void solve() {
    int n;
    cin >> n;
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int tc = 1;
    cin >> tc;
    while (tc--) solve();
    return 0;
}`,
    notes: [
      "Keep the int macro only if you are disciplined about signed main and library overloads.",
      "Drop debug-heavy code for very tight memory problems.",
    ],
  },
  {
    id: "binary-search-answer",
    title: "Binary Search On Answer",
    category: "Searching",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Two monotonic templates: last true and first true.",
    complexity: "O(log range * check)",
    tags: ["binary search", "monotonic", "last true", "first true", "answer"],
    featured: true,
    code: String.raw`bool ok(long long x) {
    // return true if x satisfies the monotonic condition
    return true;
}

long long last_true(long long lo, long long hi) {
    long long ans = lo - 1;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (ok(mid)) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}

long long first_true(long long lo, long long hi) {
    long long ans = hi + 1;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (ok(mid)) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return ans;
}`,
    notes: [
      "Last true expects T T T F F F over the search interval.",
      "First true expects F F F T T T over the search interval.",
    ],
  },
  {
    id: "priyansh-self-contained-template",
    title: "Priyansh Self-Contained Template",
    category: "Core",
    language: "C++17",
    level: "Standard",
    source: "Priyansh Agarwal",
    summary: "A compact self-contained contest shell inspired by Priyansh's CP-Templates style.",
    complexity: "Boilerplate",
    tags: ["template", "self-contained", "contest", "debug", "utility"],
    featured: true,
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using pii = pair<int, int>;
using pll = pair<ll, ll>;

#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()

const ll INF = 4e18;
const int MOD = 1e9 + 7;

template <class T>
bool chmin(T &a, const T &b) {
    if (b < a) {
        a = b;
        return true;
    }
    return false;
}

template <class T>
bool chmax(T &a, const T &b) {
    if (a < b) {
        a = b;
        return true;
    }
    return false;
}

ll mod_pow(ll a, ll e, ll mod = MOD) {
    ll res = 1;
    a %= mod;
    while (e > 0) {
        if (e & 1) res = res * a % mod;
        a = a * a % mod;
        e >>= 1;
    }
    return res;
}

void solve() {
    int n;
    cin >> n;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int tc = 1;
    cin >> tc;
    while (tc--) solve();
    return 0;
}`,
    notes: [
      "This is an original compact shell shaped around Priyansh-style self-contained templates.",
      "Use this when you want a clean single-file starting point without a heavy macro layer.",
    ],
  },
  {
    id: "teja-minimal-cpp23-shell",
    title: "Teja Minimal C++23 Shell",
    category: "Core",
    language: "C++23",
    level: "Standard",
    source: "Teja-Smart",
    summary: "A short, direct contest shell for simple proofs and simple implementations.",
    complexity: "Boilerplate",
    tags: ["template", "c++23", "minimal", "solve", "contest"],
    featured: true,
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using vi = vector<int>;
using vll = vector<ll>;

#define all(x) (x).begin(), (x).end()

template <class T>
istream &operator>>(istream &in, vector<T> &a) {
    for (T &x : a) in >> x;
    return in;
}

template <class T>
ostream &operator<<(ostream &out, const vector<T> &a) {
    for (int i = 0; i < (int)a.size(); i++) {
        if (i) out << ' ';
        out << a[i];
    }
    return out;
}

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    cin >> a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t = 1;
    cin >> t;
    while (t--) solve();
}`,
    notes: [
      "Clean contest shell tuned for short implementation and quick iteration.",
      "It keeps macros light and puts the actual implementation pressure inside solve().",
    ],
  },
  {
    id: "aryan-y-combinator-recursion",
    title: "Aryan Contest Header",
    category: "Core",
    language: "C++17",
    level: "Advanced",
    source: "aryanc403",
    summary: "A compact contest header with aliases, PBDS, rng, timer, and y_combinator recursion.",
    complexity: "Boilerplate",
    tags: ["template", "pbds", "recursion", "lambda", "y_combinator", "rng"],
    featured: true,
    code: String.raw`#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

using lli = long long;
using ii = pair<lli, lli>;
using vi = vector<lli>;
using vii = vector<ii>;

#define all(x) begin(x), end(x)
#define sz(x) (lli)(x).size()
#define eb emplace_back
#define X first
#define Y second

template <class T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

const lli INF = (1LL << 62);
const auto START_TIME = chrono::high_resolution_clock::now();
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

lli rnd(lli l, lli r) {
    return uniform_int_distribution<lli>(l, r)(rng);
}

void time_taken() {
    auto end_time = chrono::high_resolution_clock::now();
    chrono::duration<double> diff = end_time - START_TIME;
    cerr << "Time Taken : " << diff.count() << '\n';
}

template <class Fun>
class y_combinator_result {
    Fun fun_;

public:
    template <class T>
    explicit y_combinator_result(T &&fun) : fun_(forward<T>(fun)) {}

    template <class... Args>
    decltype(auto) operator()(Args &&...args) {
        return fun_(ref(*this), forward<Args>(args)...);
    }
};

template <class Fun>
decltype(auto) y_combinator(Fun &&fun) {
    return y_combinator_result<decay_t<Fun>>(forward<Fun>(fun));
}

void solve() {
    int n;
    cin >> n;

    vector<vector<int>> adj(n);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        --u; --v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> sub(n, 1);
    auto dfs = y_combinator([&](auto self, int u, int p) -> void {
        for (int v : adj[u]) {
            if (v == p) continue;
            self(v, u);
            sub[u] += sub[v];
        }
    });

    dfs(0, -1);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int T = 1;
    cin >> T;
    while (T--) solve();

    #ifdef LOCAL
    time_taken();
    #endif
    return 0;
}`,
    notes: [
      "Built around local-recursion patterns, short aliases, and contest timing helpers.",
      "Includes ordered_set, short aliases, rng, a local-recursion helper, and optional timing.",
    ],
  },
  {
    id: "prefix-sum-1d",
    title: "Prefix Sum 1D",
    category: "Arrays",
    language: "C++17",
    level: "Core",
    source: "USACO Guide",
    summary: "Precompute cumulative sums so range sum queries are O(1).",
    complexity: "Build O(n), query O(1)",
    tags: ["prefix sum", "range query", "array", "subarray"],
    featured: true,
    code: String.raw`vector<long long> pref(n + 1, 0);
for (int i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + a[i];
}

auto range_sum = [&](int l, int r) -> long long {
    // inclusive l, inclusive r, 0-indexed
    return pref[r + 1] - pref[l];
};`,
    notes: ["Use the same shape for prefix xor when the operation is invertible."],
  },
  {
    id: "prefix-sum-2d",
    title: "Prefix Sum 2D",
    category: "Arrays",
    language: "C++17",
    level: "Standard",
    source: "USACO Guide",
    summary: "Constant-time rectangle sums after O(nm) preprocessing.",
    complexity: "Build O(nm), query O(1)",
    tags: ["prefix sum", "matrix", "rectangle", "grid"],
    code: String.raw`vector<vector<long long>> pref(n + 1, vector<long long>(m + 1, 0));

for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        pref[i + 1][j + 1] = a[i][j]
            + pref[i][j + 1]
            + pref[i + 1][j]
            - pref[i][j];
    }
}

auto rect_sum = [&](int r1, int c1, int r2, int c2) -> long long {
    // inclusive corners, 0-indexed
    return pref[r2 + 1][c2 + 1]
        - pref[r1][c2 + 1]
        - pref[r2 + 1][c1]
        + pref[r1][c1];
};`,
  },
  {
    id: "difference-array",
    title: "Difference Array Range Add",
    category: "Arrays",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Batch range increments and materialize the final array with one prefix pass.",
    complexity: "Update O(1), final O(n)",
    tags: ["difference array", "range update", "prefix sum"],
    code: String.raw`vector<long long> diff(n + 1, 0);

auto add_range = [&](int l, int r, long long x) {
    // inclusive l, inclusive r, 0-indexed
    diff[l] += x;
    if (r + 1 < n) diff[r + 1] -= x;
};

for (auto [l, r, x] : queries) {
    add_range(l, r, x);
}

vector<long long> ans(n);
long long cur = 0;
for (int i = 0; i < n; i++) {
    cur += diff[i];
    ans[i] = cur;
}`,
  },
  {
    id: "two-pointers",
    title: "Two Pointers Window",
    category: "Arrays",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Maintain a valid interval while each pointer moves at most n times.",
    complexity: "O(n)",
    tags: ["two pointers", "sliding window", "subarray"],
    code: String.raw`long long ans = 0;
int r = 0;
long long sum = 0;

for (int l = 0; l < n; l++) {
    while (r < n && sum + a[r] <= limit) {
        sum += a[r];
        r++;
    }

    ans = max(ans, (long long)r - l);

    if (r == l) {
        r++;
    } else {
        sum -= a[l];
    }
}`,
    notes: ["Works directly when expanding preserves the condition monotonically."],
  },
  {
    id: "matrix-input",
    title: "Matrix Input Helper",
    category: "Utilities",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "A tiny helper for reading n by m grids without ceremony.",
    complexity: "O(nm)",
    tags: ["matrix", "grid", "input"],
    code: String.raw`vector<vector<long long>> read_matrix(int n, int m) {
    vector<vector<long long>> a(n, vector<long long>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }
    return a;
}`,
  },
  {
    id: "modular-pack",
    title: "Modular Arithmetic Pack",
    category: "Math",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Safe add, subtract, multiply, power, inverse, and division under prime MOD.",
    complexity: "O(log exponent)",
    tags: ["modular arithmetic", "binary exponentiation", "inverse", "fermats theorem"],
    code: String.raw`const long long MOD = 1e9 + 7;

long long norm(long long x, long long mod = MOD) {
    x %= mod;
    if (x < 0) x += mod;
    return x;
}

long long add(long long a, long long b, long long mod = MOD) {
    return norm(norm(a, mod) + norm(b, mod), mod);
}

long long sub(long long a, long long b, long long mod = MOD) {
    return norm(norm(a, mod) - norm(b, mod), mod);
}

long long mul(long long a, long long b, long long mod = MOD) {
    return (__int128)norm(a, mod) * norm(b, mod) % mod;
}

long long binpow(long long a, long long e, long long mod = MOD) {
    long long res = 1;
    a = norm(a, mod);
    while (e > 0) {
        if (e & 1) res = mul(res, a, mod);
        a = mul(a, a, mod);
        e >>= 1;
    }
    return res;
}

long long inv(long long a, long long mod = MOD) {
    return binpow(a, mod - 2, mod);
}

long long divide(long long a, long long b, long long mod = MOD) {
    return mul(a, inv(b, mod), mod);
}`,
    notes: ["The inverse function assumes mod is prime and b is not divisible by mod."],
  },
  {
    id: "combinatorics-ncr",
    title: "Combinatorics nCr",
    category: "Math",
    language: "C++17",
    level: "Standard",
    source: "Curated by Chinmay",
    summary: "Factorial and inverse factorial precompute for fast combinations.",
    complexity: "Precompute O(n), query O(1)",
    tags: ["ncr", "combinatorics", "factorial", "mod inverse"],
    featured: true,
    code: String.raw`const long long MOD = 1e9 + 7;
vector<long long> fact, inv_fact;

long long mod_pow(long long a, long long e) {
    long long res = 1;
    while (e > 0) {
        if (e & 1) res = res * a % MOD;
        a = a * a % MOD;
        e >>= 1;
    }
    return res;
}

void build_combi(int n) {
    fact.assign(n + 1, 1);
    inv_fact.assign(n + 1, 1);

    for (int i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * i % MOD;
    }

    inv_fact[n] = mod_pow(fact[n], MOD - 2);
    for (int i = n; i >= 1; i--) {
        inv_fact[i - 1] = inv_fact[i] * i % MOD;
    }
}

long long ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * inv_fact[r] % MOD * inv_fact[n - r] % MOD;
}`,
    notes: ["Precompute once with the maximum n across all test cases."],
  },
  {
    id: "sieve",
    title: "Sieve Of Eratosthenes",
    category: "Math",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Classic prime table up to n.",
    complexity: "O(n log log n)",
    tags: ["prime", "sieve", "number theory"],
    code: String.raw`vector<bool> is_prime;

void sieve(int n) {
    is_prime.assign(n + 1, true);
    if (n >= 0) is_prime[0] = false;
    if (n >= 1) is_prime[1] = false;

    for (long long i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            for (long long j = i * i; j <= n; j += i) {
                is_prime[j] = false;
            }
        }
    }
}`,
  },
  {
    id: "spf-factorization",
    title: "SPF Sieve Factorization",
    category: "Math",
    language: "C++17",
    level: "Standard",
    source: "Curated by Chinmay",
    summary: "Smallest prime factor table for fast repeated factorization.",
    complexity: "Build O(n log log n), factor O(log n)",
    tags: ["spf", "prime factors", "sieve", "factorization"],
    code: String.raw`vector<int> spf;

void build_spf(int n) {
    spf.resize(n + 1);
    iota(spf.begin(), spf.end(), 0);

    for (long long i = 2; i * i <= n; i++) {
        if (spf[i] == i) {
            for (long long j = i * i; j <= n; j += i) {
                if (spf[j] == j) spf[j] = i;
            }
        }
    }
}

vector<int> factorize(int x) {
    vector<int> factors;
    while (x > 1) {
        factors.push_back(spf[x]);
        x /= spf[x];
    }
    return factors;
}`,
  },
  {
    id: "miller-rabin",
    title: "Miller-Rabin Primality",
    category: "Math",
    language: "C++17",
    level: "Advanced",
    source: "Curated by Chinmay",
    summary: "Deterministic 64-bit primality check using fixed bases.",
    complexity: "O(log n * bases)",
    tags: ["miller rabin", "prime", "number theory", "64-bit"],
    code: String.raw`using u64 = unsigned long long;
using u128 = __uint128_t;

u64 mod_pow_u64(u64 a, u64 d, u64 mod) {
    u64 res = 1;
    while (d > 0) {
        if (d & 1) res = (u128)res * a % mod;
        a = (u128)a * a % mod;
        d >>= 1;
    }
    return res;
}

bool is_prime_u64(u64 n) {
    if (n < 2) return false;
    for (u64 p : {2ULL, 3ULL, 5ULL, 7ULL, 11ULL, 13ULL, 17ULL, 19ULL, 23ULL, 29ULL, 31ULL, 37ULL}) {
        if (n % p == 0) return n == p;
    }

    u64 d = n - 1;
    int s = 0;
    while ((d & 1) == 0) {
        d >>= 1;
        s++;
    }

    for (u64 a : {2ULL, 3ULL, 5ULL, 7ULL, 11ULL, 13ULL, 17ULL, 19ULL, 23ULL, 29ULL, 31ULL, 37ULL}) {
        u64 x = mod_pow_u64(a, d, n);
        if (x == 1 || x == n - 1) continue;

        bool composite = true;
        for (int r = 1; r < s; r++) {
            x = (u128)x * x % n;
            if (x == n - 1) {
                composite = false;
                break;
            }
        }
        if (composite) return false;
    }
    return true;
}`,
  },
  {
    id: "binary-gcd",
    title: "Binary GCD",
    category: "Math",
    language: "C++17",
    level: "Standard",
    source: "Curated by Chinmay",
    summary: "Stein's algorithm for gcd using shifts and subtraction.",
    complexity: "O(log max(a, b))",
    tags: ["gcd", "number theory", "bit operations"],
    code: String.raw`long long binary_gcd(long long a, long long b) {
    if (!a || !b) return a | b;

    unsigned shift = __builtin_ctzll(a | b);
    a >>= __builtin_ctzll(a);

    do {
        b >>= __builtin_ctzll(b);
        if (a > b) swap(a, b);
        b -= a;
    } while (b);

    return a << shift;
}`,
  },
  {
    id: "dsu",
    title: "Disjoint Set Union",
    category: "Data Structures",
    language: "C++17",
    level: "Core",
    source: "cp-algorithms",
    summary: "Union find with path compression and union by size.",
    complexity: "Amortized almost O(1)",
    tags: ["dsu", "union find", "components", "mst"],
    featured: true,
    code: String.raw`struct DSU {
    vector<int> parent, sz;

    DSU(int n = 0) { init(n); }

    void init(int n) {
        parent.resize(n);
        sz.assign(n, 1);
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find(parent[v]);
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
};`,
  },
  {
    id: "fenwick",
    title: "Fenwick Tree",
    category: "Data Structures",
    language: "C++17",
    level: "Standard",
    source: "KACTL",
    summary: "Point updates and prefix/range sums with a tiny constant factor.",
    complexity: "Update O(log n), query O(log n)",
    tags: ["fenwick", "binary indexed tree", "range sum"],
    featured: true,
    code: String.raw`struct Fenwick {
    int n;
    vector<long long> bit;

    Fenwick(int n = 0) { init(n); }

    void init(int n_) {
        n = n_;
        bit.assign(n + 1, 0);
    }

    void add(int idx, long long delta) {
        for (++idx; idx <= n; idx += idx & -idx) {
            bit[idx] += delta;
        }
    }

    long long sum_prefix(int idx) {
        long long res = 0;
        for (++idx; idx > 0; idx -= idx & -idx) {
            res += bit[idx];
        }
        return res;
    }

    long long sum_range(int l, int r) {
        if (r < l) return 0;
        return sum_prefix(r) - (l ? sum_prefix(l - 1) : 0);
    }
};`,
  },
  {
    id: "segment-tree",
    title: "Segment Tree",
    category: "Data Structures",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Iterative segment tree for point updates and range queries.",
    complexity: "Build O(n), update/query O(log n)",
    tags: ["segment tree", "range query", "point update"],
    code: String.raw`struct SegTree {
    int n;
    vector<long long> tree;

    SegTree(const vector<long long> &a = {}) {
        if (!a.empty()) build(a);
    }

    void build(const vector<long long> &a) {
        n = (int)a.size();
        tree.assign(2 * n, 0);
        for (int i = 0; i < n; i++) tree[n + i] = a[i];
        for (int i = n - 1; i > 0; i--) tree[i] = tree[i << 1] + tree[i << 1 | 1];
    }

    void set_value(int pos, long long val) {
        for (tree[pos += n] = val; pos > 1; pos >>= 1) {
            tree[pos >> 1] = tree[pos] + tree[pos ^ 1];
        }
    }

    long long query(int l, int r) {
        // inclusive l, inclusive r
        long long res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res += tree[l++];
            if (r & 1) res += tree[--r];
        }
        return res;
    }
};`,
  },
  {
    id: "sparse-table",
    title: "Sparse Table RMQ",
    category: "Data Structures",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Static idempotent range minimum queries in O(1).",
    complexity: "Build O(n log n), query O(1)",
    tags: ["sparse table", "rmq", "range minimum", "static array"],
    code: String.raw`struct SparseTable {
    vector<vector<int>> st;
    vector<int> lg;

    SparseTable(const vector<int> &a = {}) {
        if (!a.empty()) build(a);
    }

    void build(const vector<int> &a) {
        int n = (int)a.size();
        lg.assign(n + 1, 0);
        for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;

        st.assign(lg[n] + 1, vector<int>(n));
        st[0] = a;
        for (int k = 1; k <= lg[n]; k++) {
            for (int i = 0; i + (1 << k) <= n; i++) {
                st[k][i] = min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
            }
        }
    }

    int query(int l, int r) {
        int k = lg[r - l + 1];
        return min(st[k][l], st[k][r - (1 << k) + 1]);
    }
};`,
  },
  {
    id: "graph-bfs-dfs",
    title: "Graph BFS And DFS",
    category: "Graphs",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "Adjacency list traversal skeletons for unweighted graphs.",
    complexity: "O(n + m)",
    tags: ["bfs", "dfs", "graph", "traversal"],
    code: String.raw`void bfs(int src, const vector<vector<int>> &adj) {
    int n = adj.size();
    vector<int> dist(n, -1);
    queue<int> q;

    dist[src] = 0;
    q.push(src);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}

void dfs(int u, const vector<vector<int>> &adj, vector<int> &vis) {
    vis[u] = 1;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}`,
  },
  {
    id: "dijkstra",
    title: "Dijkstra Shortest Path",
    category: "Graphs",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Shortest paths from one source in a non-negative weighted graph.",
    complexity: "O((n + m) log n)",
    tags: ["dijkstra", "shortest path", "priority queue", "graph"],
    code: String.raw`const long long INF = 4e18;

vector<long long> dijkstra(int src, const vector<vector<pair<int, int>>> &adj) {
    int n = adj.size();
    vector<long long> dist(n, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d != dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
  },
  {
    id: "toposort",
    title: "Topological Sort",
    category: "Graphs",
    language: "C++17",
    level: "Standard",
    source: "Curated by Chinmay",
    summary: "Kahn's algorithm for DAG ordering and cycle detection.",
    complexity: "O(n + m)",
    tags: ["toposort", "dag", "indegree", "graph"],
    code: String.raw`vector<int> topo_sort(const vector<vector<int>> &adj) {
    int n = adj.size();
    vector<int> indeg(n, 0);
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) indeg[v]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indeg[i] == 0) q.push(i);
    }

    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }

    if ((int)order.size() != n) return {};
    return order;
}`,
  },
  {
    id: "lca-binary-lifting",
    title: "LCA Binary Lifting",
    category: "Graphs",
    language: "C++17",
    level: "Advanced",
    source: "cp-algorithms",
    summary: "Lowest common ancestor queries on a rooted tree.",
    complexity: "Build O(n log n), query O(log n)",
    tags: ["lca", "binary lifting", "tree", "ancestor"],
    code: String.raw`struct LCA {
    int n, LOG;
    vector<int> depth;
    vector<vector<int>> up;

    LCA(const vector<vector<int>> &tree, int root = 0) {
        n = tree.size();
        LOG = 1;
        while ((1 << LOG) <= n) LOG++;
        depth.assign(n, 0);
        up.assign(LOG, vector<int>(n, root));
        dfs(root, root, tree);
    }

    void dfs(int u, int p, const vector<vector<int>> &tree) {
        up[0][u] = p;
        for (int j = 1; j < LOG; j++) up[j][u] = up[j - 1][up[j - 1][u]];
        for (int v : tree[u]) {
            if (v == p) continue;
            depth[v] = depth[u] + 1;
            dfs(v, u, tree);
        }
    }

    int lift(int u, int k) {
        for (int j = 0; j < LOG; j++) {
            if (k & (1 << j)) u = up[j][u];
        }
        return u;
    }

    int query(int a, int b) {
        if (depth[a] < depth[b]) swap(a, b);
        a = lift(a, depth[a] - depth[b]);
        if (a == b) return a;

        for (int j = LOG - 1; j >= 0; j--) {
            if (up[j][a] != up[j][b]) {
                a = up[j][a];
                b = up[j][b];
            }
        }
        return up[0][a];
    }
};`,
  },
  {
    id: "kmp-prefix-function",
    title: "KMP Prefix Function",
    category: "Strings",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Prefix function for pattern matching and border problems.",
    complexity: "O(n)",
    tags: ["kmp", "prefix function", "string", "pattern matching"],
    code: String.raw`vector<int> prefix_function(const string &s) {
    int n = s.size();
    vector<int> pi(n, 0);

    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) {
            j = pi[j - 1];
        }
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

vector<int> find_occurrences(const string &text, const string &pat) {
    string s = pat + "#" + text;
    vector<int> pi = prefix_function(s);
    vector<int> hits;

    for (int i = (int)pat.size() + 1; i < (int)s.size(); i++) {
        if (pi[i] == (int)pat.size()) {
            hits.push_back(i - 2 * (int)pat.size());
        }
    }
    return hits;
}`,
  },
  {
    id: "z-function",
    title: "Z Function",
    category: "Strings",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "For each position, compute the longest prefix match starting there.",
    complexity: "O(n)",
    tags: ["z function", "string", "pattern matching"],
    code: String.raw`vector<int> z_function(const string &s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;

    for (int i = 1; i < n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}`,
  },
  {
    id: "rolling-hash",
    title: "Rolling Hash",
    category: "Strings",
    language: "C++17",
    level: "Advanced",
    source: "KACTL",
    summary: "Prefix hashes for quick substring equality checks.",
    complexity: "Build O(n), query O(1)",
    tags: ["hashing", "string", "substring"],
    code: String.raw`struct RollingHash {
    static const long long MOD = 1e9 + 7;
    static const long long BASE = 911382323;

    vector<long long> pref, power;

    RollingHash(const string &s) {
        int n = s.size();
        pref.assign(n + 1, 0);
        power.assign(n + 1, 1);

        for (int i = 0; i < n; i++) {
            pref[i + 1] = (pref[i] * BASE + s[i]) % MOD;
            power[i + 1] = power[i] * BASE % MOD;
        }
    }

    long long get(int l, int r) {
        // inclusive l, inclusive r
        long long ans = (pref[r + 1] - pref[l] * power[r - l + 1]) % MOD;
        if (ans < 0) ans += MOD;
        return ans;
    }
};`,
    notes: ["For adversarial string problems, use double hashing or a 64-bit hash variant."],
  },
  {
    id: "trie",
    title: "Trie",
    category: "Strings",
    language: "C++17",
    level: "Standard",
    source: "Curated by Chinmay",
    summary: "Lowercase trie for dictionary, prefix counting, and word queries.",
    complexity: "O(length) per operation",
    tags: ["trie", "prefix", "dictionary", "strings"],
    code: String.raw`struct Trie {
    struct Node {
        int child[26];
        int pass = 0;
        int end = 0;

        Node() {
            fill(child, child + 26, -1);
        }
    };

    vector<Node> t;

    Trie() { t.push_back(Node()); }

    void insert(const string &s) {
        int u = 0;
        for (char c : s) {
            int x = c - 'a';
            if (t[u].child[x] == -1) {
                t[u].child[x] = t.size();
                t.push_back(Node());
            }
            u = t[u].child[x];
            t[u].pass++;
        }
        t[u].end++;
    }

    bool search(const string &s) {
        int u = 0;
        for (char c : s) {
            int x = c - 'a';
            if (t[u].child[x] == -1) return false;
            u = t[u].child[x];
        }
        return t[u].end > 0;
    }
};`,
  },
  {
    id: "lis",
    title: "Longest Increasing Subsequence",
    category: "DP",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Length of LIS with patience sorting.",
    complexity: "O(n log n)",
    tags: ["lis", "dp", "binary search", "sequence"],
    code: String.raw`int lis_length(const vector<int> &a) {
    vector<int> tail;

    for (int x : a) {
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if (it == tail.end()) {
            tail.push_back(x);
        } else {
            *it = x;
        }
    }
    return tail.size();
}`,
    notes: ["Use upper_bound instead of lower_bound for non-decreasing subsequence."],
  },
  {
    id: "knapsack-01",
    title: "0/1 Knapsack",
    category: "DP",
    language: "C++17",
    level: "Core",
    source: "Curated by Chinmay",
    summary: "One-dimensional DP for choosing each item at most once.",
    complexity: "O(nW)",
    tags: ["knapsack", "dp", "optimization"],
    code: String.raw`vector<long long> dp(W + 1, 0);

for (int i = 0; i < n; i++) {
    int wt = weight[i];
    long long val = value[i];

    for (int cap = W; cap >= wt; cap--) {
        dp[cap] = max(dp[cap], dp[cap - wt] + val);
    }
}

cout << dp[W] << endl;`,
    notes: ["Reverse capacity order is what prevents reusing the same item."],
  },
  {
    id: "bitmask-submasks",
    title: "Enumerate Submasks",
    category: "Utilities",
    language: "C++17",
    level: "Standard",
    source: "cp-algorithms",
    summary: "Loop through every submask of a mask.",
    complexity: "O(3^n) across all masks",
    tags: ["bitmask", "submask", "dp"],
    code: String.raw`for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // use sub
}

// include zero submask if needed
for (int sub = mask;; sub = (sub - 1) & mask) {
    // use sub
    if (sub == 0) break;
}`,
  },
  {
    id: "ordered-set",
    title: "PBDS Ordered Set",
    category: "Data Structures",
    language: "GNU++17",
    level: "Advanced",
    source: "Curated by Chinmay",
    summary: "Policy-based tree with order statistics.",
    complexity: "O(log n)",
    tags: ["pbds", "ordered set", "kth", "order statistics"],
    code: String.raw`#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

template <class T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

ordered_set<int> os;

// os.insert(x);
// os.erase(x);
// *os.find_by_order(k) gives kth element, 0-indexed
// os.order_of_key(x) gives count of elements strictly less than x`,
    notes: ["For duplicates, store pairs like {value, unique_id}."],
  },
  {
    id: "tourist-lean-main",
    title: "Tourist Lean Main",
    category: "Core",
    language: "C++17",
    level: "Core",
    source: "Tourist",
    summary: "Minimal main file with fast IO and a LOCAL debug hook.",
    complexity: "Boilerplate",
    tags: ["tourist", "template", "debug", "fast io", "minimal"],
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

#ifdef LOCAL
#include "algo/debug.h"
#else
#define debug(...) 42
#endif

void solve() {
    int n;
    cin >> n;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    solve();
    return 0;
}`,
    notes: [
      "This is the copy-ready Snippex version of tourist's public lean template shape.",
      "Keep debug(...) calls in code; they compile away outside LOCAL.",
    ],
  },
  {
    id: "tourist-case-loop-shell",
    title: "Tourist Case Loop Shell",
    category: "Core",
    language: "C++17",
    level: "Core",
    source: "Tourist",
    summary: "Case-numbered shell for Google Code Jam / Hash Code style output.",
    complexity: "Boilerplate",
    tags: ["tourist", "case loop", "template", "fast io"],
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

#ifdef LOCAL
#include "algo/debug.h"
#else
#define debug(...) 42
#endif

void solve_case(int tc) {
    cout << "Case #" << tc << ": ";

    long long answer = 0;
    cout << answer << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;
    for (int tc = 1; tc <= T; tc++) {
        solve_case(tc);
    }
    return 0;
}`,
    notes: ["Use this when the judge requires exact Case #x: formatting."],
  },
  {
    id: "benq-short-contest-header",
    title: "Benq Short Contest Header",
    category: "Core",
    language: "C++17",
    level: "Standard",
    source: "Benq",
    summary: "Macro-dense header with aliases, loop helpers, rng, and ckmin/ckmax.",
    complexity: "Boilerplate",
    tags: ["benq", "template", "macros", "contest", "rng"],
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using db = long double;
using str = string;
using pi = pair<int, int>;

template <class T> using V = vector<T>;
using vi = V<int>;
using vll = V<ll>;
using vpi = V<pi>;

#define sz(x) int((x).size())
#define all(x) begin(x), end(x)
#define sor(x) sort(all(x))
#define pb push_back
#define eb emplace_back
#define f first
#define s second

#define FOR(i, a, b) for (int i = (a); i < (b); ++i)
#define F0R(i, a) FOR(i, 0, a)
#define ROF(i, a, b) for (int i = (b) - 1; i >= (a); --i)
#define R0F(i, a) ROF(i, 0, a)
#define each(a, x) for (auto &a : x)

mt19937 rng((uint32_t)chrono::steady_clock::now().time_since_epoch().count());

template <class T>
bool ckmin(T &a, const T &b) {
    return b < a ? a = b, true : false;
}

template <class T>
bool ckmax(T &a, const T &b) {
    return a < b ? a = b, true : false;
}

void solve() {
    int n;
    cin >> n;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int T = 1;
    cin >> T;
    while (T--) solve();
}`,
    notes: ["This is a compact Snippex version of Benq's public short-template style."],
  },
  {
    id: "benq-stress-tester-harness",
    title: "Benq Stress Tester Harness",
    category: "Utilities",
    language: "Shell",
    level: "Standard",
    source: "Benq",
    summary: "Brute-vs-solve stress loop for catching wrong answers locally.",
    complexity: "Workflow",
    tags: ["benq", "stress", "testing", "generator", "diff"],
    code: String.raw`#!/usr/bin/env bash
set -euo pipefail

g++ -std=c++17 -O2 -pipe -o main main.cpp
g++ -std=c++17 -O2 -pipe -o brute brute.cpp
g++ -std=c++17 -O2 -pipe -o gen gen.cpp

for ((tc = 1; ; tc++)); do
    ./gen "$tc" > input.txt
    ./main < input.txt > out.txt
    ./brute < input.txt > ans.txt

    if ! diff -w out.txt ans.txt > /dev/null; then
        echo "WA on test $tc"
        cat input.txt
        echo "main:"
        cat out.txt
        echo "brute:"
        cat ans.txt
        exit 1
    fi

    echo "OK $tc"
done`,
    notes: ["Give the generator a seed so the failing case is reproducible."],
  },
  {
    id: "neal-iterative-segment-tree",
    title: "Neal Iterative Segment Tree",
    category: "Data Structures",
    language: "C++17",
    level: "Standard",
    source: "Neal Wu",
    summary: "Compact bottom-up segment tree with point updates and range queries.",
    complexity: "Build O(n), query/update O(log n)",
    tags: ["neal", "segment tree", "iterative", "range query"],
    code: String.raw`template <class T>
struct SegTree {
    int n = 0;
    T neutral;
    vector<T> tree;

    SegTree() = default;
    SegTree(int n_, T neutral_) { init(n_, neutral_); }

    T merge(T a, T b) const {
        return a + b;
    }

    void init(int n_, T neutral_) {
        neutral = neutral_;
        n = 1;
        while (n < n_) n <<= 1;
        tree.assign(2 * n, neutral);
    }

    void build(const vector<T> &a) {
        for (int i = 0; i < (int)a.size(); i++) tree[n + i] = a[i];
        for (int i = n - 1; i > 0; i--) tree[i] = merge(tree[i << 1], tree[i << 1 | 1]);
    }

    void set_point(int idx, T value) {
        idx += n;
        tree[idx] = value;
        for (idx >>= 1; idx; idx >>= 1) tree[idx] = merge(tree[idx << 1], tree[idx << 1 | 1]);
    }

    T query(int l, int r) const {
        T left = neutral, right = neutral;
        for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
            if (l & 1) left = merge(left, tree[l++]);
            if (r & 1) right = merge(tree[--r], right);
        }
        return merge(left, right);
    }
};`,
    notes: ["Range is half-open [l, r). Change merge and neutral for min/max/gcd."],
  },
  {
    id: "neal-simple-modint",
    title: "Neal Simple ModInt",
    category: "Math",
    language: "C++17",
    level: "Standard",
    source: "Neal Wu",
    summary: "Small fixed-mod integer class for fast combinatorics and DP.",
    complexity: "O(log MOD) inverse",
    tags: ["neal", "modint", "modular arithmetic", "combinatorics"],
    code: String.raw`template <int MOD>
struct ModInt {
    int value;

    ModInt(long long v = 0) {
        value = int(v % MOD);
        if (value < 0) value += MOD;
    }

    ModInt &operator+=(const ModInt &other) {
        value += other.value;
        if (value >= MOD) value -= MOD;
        return *this;
    }

    ModInt &operator-=(const ModInt &other) {
        value -= other.value;
        if (value < 0) value += MOD;
        return *this;
    }

    ModInt &operator*=(const ModInt &other) {
        value = int((long long)value * other.value % MOD);
        return *this;
    }

    friend ModInt power(ModInt a, long long e) {
        ModInt res = 1;
        while (e > 0) {
            if (e & 1) res *= a;
            a *= a;
            e >>= 1;
        }
        return res;
    }

    ModInt inv() const {
        return power(*this, MOD - 2);
    }

    ModInt &operator/=(const ModInt &other) {
        return *this *= other.inv();
    }

    friend ModInt operator+(ModInt a, const ModInt &b) { return a += b; }
    friend ModInt operator-(ModInt a, const ModInt &b) { return a -= b; }
    friend ModInt operator*(ModInt a, const ModInt &b) { return a *= b; }
    friend ModInt operator/(ModInt a, const ModInt &b) { return a /= b; }
};

using mint = ModInt<1000000007>;`,
    notes: ["The inverse assumes MOD is prime."],
  },
  {
    id: "errichto-dinic-flow",
    title: "Errichto Dinic Flow",
    category: "Graphs",
    language: "C++17",
    level: "Advanced",
    source: "Errichto",
    summary: "Reusable Dinic max-flow class with level graph and current-edge pointer.",
    complexity: "O(V^2E) general",
    tags: ["errichto", "dinic", "max flow", "graph"],
    code: String.raw`template <class T>
struct Dinic {
    struct Edge {
        int to, rev;
        T cap;
    };

    int n;
    vector<vector<Edge>> g;
    vector<int> level, it;

    Dinic(int n_) : n(n_), g(n_), level(n_), it(n_) {}

    void add_edge(int v, int to, T cap) {
        Edge a{to, (int)g[to].size(), cap};
        Edge b{v, (int)g[v].size(), 0};
        g[v].push_back(a);
        g[to].push_back(b);
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (const Edge &e : g[v]) {
                if (e.cap > 0 && level[e.to] == -1) {
                    level[e.to] = level[v] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    T dfs(int v, int t, T pushed) {
        if (v == t || pushed == 0) return pushed;
        for (int &i = it[v]; i < (int)g[v].size(); i++) {
            Edge &e = g[v][i];
            if (e.cap <= 0 || level[e.to] != level[v] + 1) continue;
            T got = dfs(e.to, t, min(pushed, e.cap));
            if (got == 0) continue;
            e.cap -= got;
            g[e.to][e.rev].cap += got;
            return got;
        }
        return 0;
    }

    T max_flow(int s, int t) {
        T flow = 0;
        const T INF = numeric_limits<T>::max() / 4;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while (T pushed = dfs(s, t, INF)) flow += pushed;
        }
        return flow;
    }
};`,
    notes: ["Use long long capacities unless every capacity comfortably fits in int."],
  },
  {
    id: "errichto-two-sat",
    title: "Errichto 2-SAT Solver",
    category: "Graphs",
    language: "C++17",
    level: "Advanced",
    source: "Errichto",
    summary: "Implication-graph 2-SAT template using SCC order.",
    complexity: "O(n + m)",
    tags: ["errichto", "2-sat", "scc", "implication graph"],
    code: String.raw`struct TwoSat {
    int n;
    vector<vector<int>> g, rg;
    vector<int> comp, order, value;

    TwoSat(int n_) : n(n_), g(2 * n_), rg(2 * n_) {}

    int id(int x, bool is_true) const {
        return 2 * x + (is_true ? 0 : 1);
    }

    void imply(int a, int b) {
        g[a].push_back(b);
        rg[b].push_back(a);
    }

    void either(int a, bool av, int b, bool bv) {
        int x = id(a, av), nx = id(a, !av);
        int y = id(b, bv), ny = id(b, !bv);
        imply(nx, y);
        imply(ny, x);
    }

    bool solve() {
        vector<int> seen(2 * n, 0);
        function<void(int)> dfs1 = [&](int v) {
            seen[v] = 1;
            for (int to : g[v]) if (!seen[to]) dfs1(to);
            order.push_back(v);
        };

        comp.assign(2 * n, -1);
        function<void(int, int)> dfs2 = [&](int v, int c) {
            comp[v] = c;
            for (int to : rg[v]) if (comp[to] == -1) dfs2(to, c);
        };

        for (int i = 0; i < 2 * n; i++) if (!seen[i]) dfs1(i);
        reverse(order.begin(), order.end());

        int c = 0;
        for (int v : order) if (comp[v] == -1) dfs2(v, c++);

        value.assign(n, 0);
        for (int i = 0; i < n; i++) {
            if (comp[2 * i] == comp[2 * i + 1]) return false;
            value[i] = comp[2 * i] > comp[2 * i + 1];
        }
        return true;
    }
};`,
    notes: ["either(a, true, b, false) means variable a OR not b."],
  },
  {
    id: "errichto-fft-multiply",
    title: "Errichto FFT Multiply",
    category: "Math",
    language: "C++17",
    level: "Advanced",
    source: "Errichto",
    summary: "Complex FFT polynomial multiplication for integer coefficients.",
    complexity: "O(n log n)",
    tags: ["errichto", "fft", "polynomial", "convolution"],
    code: String.raw`using cd = complex<double>;
const double PI = acos(-1.0);

void fft(vector<cd> &a, bool invert) {
    int n = (int)a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }

    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w = 1;
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }

    if (invert) {
        for (cd &x : a) x /= n;
    }
}

vector<long long> multiply(vector<long long> a, vector<long long> b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < (int)a.size() + (int)b.size()) n <<= 1;
    fa.resize(n);
    fb.resize(n);

    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);

    vector<long long> res(n);
    for (int i = 0; i < n; i++) res[i] = llround(fa[i].real());
    while (!res.empty() && res.back() == 0) res.pop_back();
    return res;
}`,
    notes: ["For modular convolution, prefer ACL convolution when available."],
  },
  {
    id: "ecnerwala-cartesian-tree",
    title: "ecnerwala Cartesian Tree",
    category: "Data Structures",
    language: "C++17",
    level: "Advanced",
    source: "ecnerwala",
    summary: "Build parent links of the min Cartesian tree in linear time.",
    complexity: "O(n)",
    tags: ["ecnerwala", "cartesian tree", "monotonic stack", "rmq"],
    code: String.raw`template <class T>
vector<int> cartesian_tree_parent(const vector<T> &a) {
    int n = (int)a.size();
    vector<int> parent(n, -1), st;

    for (int i = 0; i < n; i++) {
        int last = -1;
        while (!st.empty() && a[i] < a[st.back()]) {
            last = st.back();
            st.pop_back();
        }

        if (!st.empty()) parent[i] = st.back();
        if (last != -1) parent[last] = i;
        st.push_back(i);
    }

    return parent;
}

template <class T>
int cartesian_tree_root(const vector<T> &a) {
    auto parent = cartesian_tree_parent(a);
    return int(find(parent.begin(), parent.end(), -1) - parent.begin());
}`,
    notes: ["Use < for a min tree; flip the comparison for a max Cartesian tree."],
  },
  {
    id: "ecnerwala-berlekamp-massey",
    title: "ecnerwala Berlekamp-Massey",
    category: "Math",
    language: "C++17",
    level: "Advanced",
    source: "ecnerwala",
    summary: "Recover the shortest linear recurrence from initial sequence terms.",
    complexity: "O(n^2)",
    tags: ["ecnerwala", "berlekamp massey", "linear recurrence", "sequence"],
    code: String.raw`const long long MOD_BM = 998244353;

long long mod_pow_bm(long long a, long long e) {
    long long r = 1;
    while (e > 0) {
        if (e & 1) r = r * a % MOD_BM;
        a = a * a % MOD_BM;
        e >>= 1;
    }
    return r;
}

vector<long long> berlekamp_massey(const vector<long long> &s) {
    vector<long long> C{1}, B{1};
    long long b = 1;
    int L = 0, m = 1;

    for (int n = 0; n < (int)s.size(); n++) {
        long long d = 0;
        for (int i = 0; i <= L; i++) d = (d + C[i] * s[n - i]) % MOD_BM;

        if (d == 0) {
            m++;
            continue;
        }

        vector<long long> T = C;
        long long coef = d * mod_pow_bm(b, MOD_BM - 2) % MOD_BM;
        if ((int)C.size() < (int)B.size() + m) C.resize(B.size() + m);

        for (int i = 0; i < (int)B.size(); i++) {
            C[i + m] = (C[i + m] - coef * B[i]) % MOD_BM;
            if (C[i + m] < 0) C[i + m] += MOD_BM;
        }

        if (2 * L <= n) {
            L = n + 1 - L;
            B = T;
            b = d;
            m = 1;
        } else {
            m++;
        }
    }

    C.erase(C.begin());
    for (long long &x : C) x = (MOD_BM - x) % MOD_BM;
    return C;
}`,
    notes: ["Returns coefficients c where s[n] = sum c[i] * s[n - i - 1]."],
  },
  {
    id: "acl-dsu-fenwick-usage",
    title: "ACL DSU + Fenwick Usage",
    category: "Data Structures",
    language: "C++17",
    level: "Standard",
    source: "AtCoder Library",
    summary: "Official-library usage skeleton for connected components and prefix sums.",
    complexity: "DSU amortized alpha(n), Fenwick O(log n)",
    tags: ["acl", "atcoder", "dsu", "fenwick", "library"],
    code: String.raw`#include <bits/stdc++.h>
#include <atcoder/dsu>
#include <atcoder/fenwicktree>
using namespace std;
using namespace atcoder;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    dsu uf(n);
    fenwick_tree<long long> bit(n);

    while (q--) {
        int type;
        cin >> type;

        if (type == 0) {
            int a, b;
            cin >> a >> b;
            uf.merge(a, b);
        } else if (type == 1) {
            int idx;
            long long delta;
            cin >> idx >> delta;
            bit.add(idx, delta);
        } else {
            int l, r;
            cin >> l >> r;
            cout << bit.sum(l, r) << '\n';
        }
    }
}`,
    notes: ["ACL ranges are usually half-open [l, r)."],
  },
  {
    id: "acl-lazy-segtree-range-add",
    title: "ACL Lazy Segtree Range Add",
    category: "Data Structures",
    language: "C++17",
    level: "Advanced",
    source: "AtCoder Library",
    summary: "Ready lazy_segtree skeleton for range add and range max query.",
    complexity: "O(log n)",
    tags: ["acl", "atcoder", "lazy segtree", "range add", "range max"],
    code: String.raw`#include <bits/stdc++.h>
#include <atcoder/lazysegtree>
using namespace std;
using namespace atcoder;

long long op(long long a, long long b) {
    return max(a, b);
}

long long e() {
    return LLONG_MIN / 4;
}

long long mapping(long long f, long long x) {
    return f + x;
}

long long composition(long long f, long long g) {
    return f + g;
}

long long id() {
    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    vector<long long> a(n);
    for (long long &x : a) cin >> x;

    lazy_segtree<long long, op, e, long long, mapping, composition, id> seg(a);

    while (q--) {
        int type, l, r;
        cin >> type >> l >> r;
        if (type == 0) {
            long long add;
            cin >> add;
            seg.apply(l, r, add);
        } else {
            cout << seg.prod(l, r) << '\n';
        }
    }
}`,
    notes: ["Change op/e/mapping/composition to morph this into sum, min, assign, or affine updates."],
  },
  {
    id: "acl-convolution-mod",
    title: "ACL Convolution",
    category: "Math",
    language: "C++17",
    level: "Standard",
    source: "AtCoder Library",
    summary: "NTT-backed modular convolution usage snippet.",
    complexity: "O(n log n)",
    tags: ["acl", "atcoder", "convolution", "ntt", "polynomial"],
    code: String.raw`#include <bits/stdc++.h>
#include <atcoder/convolution>
#include <atcoder/modint>
using namespace std;
using namespace atcoder;

using mint = modint998244353;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<mint> a(n), b(m);
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        a[i] = x;
    }
    for (int i = 0; i < m; i++) {
        long long x;
        cin >> x;
        b[i] = x;
    }

    vector<mint> c = convolution(a, b);
    for (int i = 0; i < (int)c.size(); i++) {
        if (i) cout << ' ';
        cout << c[i].val();
    }
    cout << '\n';
}`,
    notes: ["The fastest painless polynomial multiply if ACL is allowed."],
  },
  {
    id: "jiangly-compact-cpp20-shell",
    title: "Jiangly Compact C++20 Shell",
    category: "Core",
    language: "C++20",
    level: "Standard",
    source: "Jiangly",
    summary: "Terse compact shell with modern aliases, lambda solve, and no ceremony.",
    complexity: "Boilerplate",
    tags: ["jiangly", "c++20", "template", "lambda", "contest"],
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
using u64 = unsigned long long;
using i128 = __int128_t;

template <class T>
bool chmin(T &a, const T &b) {
    if (b < a) return a = b, true;
    return false;
}

template <class T>
bool chmax(T &a, const T &b) {
    if (a < b) return a = b, true;
    return false;
}

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (auto &x : a) cin >> x;

    auto work = [&]() -> i64 {
        i64 ans = 0;
        for (int x : a) ans += x;
        return ans;
    };

    cout << work() << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T = 1;
    cin >> T;
    while (T--) solve();
    return 0;
}`,
    notes: [
      "Public-facing Snippex shell tuned for compact C++20 contest code.",
      "It focuses on the compact C++20 style commonly seen in Jiangly solutions.",
    ],
  },
  {
    id: "ncduy0303-contest-template",
    title: "ncduy0303 Contest Template",
    category: "Core",
    language: "C++17",
    level: "Standard",
    source: "ncduy0303",
    summary: "Balanced competitive template with fast IO, aliases, constants, and helpers.",
    complexity: "Boilerplate",
    tags: ["ncduy0303", "template", "contest", "helpers"],
    code: String.raw`#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using pii = pair<int, int>;
using pll = pair<ll, ll>;

#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()
#define fi first
#define se second

const int MOD = 1000000007;
const ll INF = (1LL << 62);

template <class T>
void read(vector<T> &a) {
    for (T &x : a) cin >> x;
}

template <class T>
void print_vector(const vector<T> &a) {
    for (int i = 0; i < (int)a.size(); i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\n';
}

void solve() {
    int n;
    cin >> n;

    vector<ll> a(n);
    read(a);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int tc = 1;
    cin >> tc;
    while (tc--) solve();
    return 0;
}`,
    notes: ["Snippex-ready compact version of the public template-library style."],
  },
];

export const categories = ["All", ...Array.from(new Set(templates.map((item) => item.category)))];
