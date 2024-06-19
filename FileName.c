#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 线性表定义
#define MAX_LIST_SIZE 100

typedef struct {
    int data[MAX_LIST_SIZE];
    int length;
} LinearList;

// 栈定义
#define MAX_STACK_SIZE 100

typedef struct {
    int data[MAX_STACK_SIZE];
    int top;
} Stack;

// 队列定义
#define MAX_QUEUE_SIZE 100

typedef struct {
    int data[MAX_QUEUE_SIZE];
    int front;
    int rear;
} Queue;

// 串定义
typedef struct {
    char* str;
    int length;
} String;

// 二叉树定义
typedef struct TreeNode {
    int data;
    struct TreeNode* left, * right;
} TreeNode;

// 图定义
#define MAX_VERTICES 100

typedef struct {
    int adjMatrix[MAX_VERTICES][MAX_VERTICES];
    int numVertices;
} Graph;

// 函数声明
void LinearListMenu();
void StackMenu();
void QueueMenu();
void StringMenu();
void TreeMenu();
void GraphMenu();
void SearchMenu();
void SortMenu();

// 线性表功能实现
void InitList(LinearList* L) {
    L->length = 0;
}

int ListInsert(LinearList* L, int pos, int elem) {
    if (pos < 1 || pos > L->length + 1 || L->length >= MAX_LIST_SIZE) {
        return 0;
    }
    for (int i = L->length; i >= pos; i--) {
        L->data[i] = L->data[i - 1];
    }
    L->data[pos - 1] = elem;
    L->length++;
    return 1;
}

int ListDelete(LinearList* L, int pos) {
    if (pos < 1 || pos > L->length) {
        return 0;
    }
    for (int i = pos; i < L->length; i++) {
        L->data[i - 1] = L->data[i];
    }
    L->length--;
    return 1;
}

int LocateElem(LinearList* L, int elem) {
    for (int i = 0; i < L->length; i++) {
        if (L->data[i] == elem) {
            return i + 1;
        }
    }
    return 0;
}

int GetElem(LinearList* L, int pos) {
    if (pos < 1 || pos > L->length) {
        return -1;
    }
    return L->data[pos - 1];
}

int ListLength(LinearList* L) {
    return L->length;
}

void PrintList(LinearList* L) {
    for (int i = 0; i < L->length; i++) {
        printf("%d ", L->data[i]);
    }
    printf("\n");
}

// 栈功能实现
void InitStack(Stack* S) {
    S->top = -1;
}

int Push(Stack* S, int elem) {
    if (S->top == MAX_STACK_SIZE - 1) {
        return 0;
    }
    S->data[++(S->top)] = elem;
    return 1;
}

int Pop(Stack* S, int* elem) {
    if (S->top == -1) {
        return 0;
    }
    *elem = S->data[(S->top)--];
    return 1;
}

int GetTop(Stack* S, int* elem) {
    if (S->top == -1) {
        return 0;
    }
    *elem = S->data[S->top];
    return 1;
}

void PrintStack(Stack* S) {
    for (int i = 0; i <= S->top; i++) {
        printf("%d ", S->data[i]);
    }
    printf("\n");
}

void DecimalToBinary(int num) {
    Stack S;
    InitStack(&S);
    while (num > 0) {
        Push(&S, num % 2);
        num /= 2;
    }
    while (S.top != -1) {
        int binDigit;
        Pop(&S, &binDigit);
        printf("%d", binDigit);
    }
    printf("\n");
}

// 队列功能实现
void InitQueue(Queue* Q) {
    Q->front = 0;
    Q->rear = 0;
}

int EnQueue(Queue* Q, int elem) {
    if ((Q->rear + 1) % MAX_QUEUE_SIZE == Q->front) {
        return 0;
    }
    Q->data[Q->rear] = elem;
    Q->rear = (Q->rear + 1) % MAX_QUEUE_SIZE;
    return 1;
}

int DeQueue(Queue* Q, int* elem) {
    if (Q->front == Q->rear) {
        return 0;
    }
    *elem = Q->data[Q->front];
    Q->front = (Q->front + 1) % MAX_QUEUE_SIZE;
    return 1;
}

int GetFront(Queue* Q, int* elem) {
    if (Q->front == Q->rear) {
        return 0;
    }
    *elem = Q->data[Q->front];
    return 1;
}

void PrintQueue(Queue* Q) {
    for (int i = Q->front; i != Q->rear; i = (i + 1) % MAX_QUEUE_SIZE) {
        printf("%d ", Q->data[i]);
    }
    printf("\n");
}

// 串功能实现
String InitString(const char* s) {
    String str;
    str.length = strlen(s);
    str.str = (char*)malloc(str.length + 1);  // 为字符串分配内存，包括终止符
    if (str.str) {
        // 复制字符串到新的内存空间中
        strcpy_s(str.str, str.length + 1, s);
    }
    return str;
}
String SubString(String* S, int pos, int len) {
    String sub;
    if (pos < 0 || pos + len > S->length) {
        sub.str = NULL;
        sub.length = 0;
        return sub;
    }
    sub.str = (char*)malloc(len + 1);
    if (sub.str) {
        strncpy_s(sub.str, len + 1, S->str + pos, len);
        sub.str[len] = '\0';  // 添加字符串终止符
    }
    sub.length = len;
    return sub;
}

void InsertString(String* S, int pos, String* T) {
    if (pos < 0 || pos > S->length) {
        return;
    }
    S->str = (char*)realloc(S->str, S->length + T->length + 1);
    memmove(S->str + pos + T->length, S->str + pos, S->length - pos + 1);
    memcpy(S->str + pos, T->str, T->length);
    S->length += T->length;
}

void DeleteString(String* S, int pos, int len) {
    if (pos < 0 || pos + len > S->length) {
        return;
    }
    memmove(S->str + pos, S->str + pos + len, S->length - pos - len + 1);
    S->length -= len;
    S->str = (char*)realloc(S->str, S->length + 1);
}

int FindString(String* S, String* T) {
    char* pos = strstr(S->str, T->str);
    if (pos == NULL) {
        return -1;
    }
    return pos - S->str;
}

int CompareString(String* S, String* T) {
    return strcmp(S->str, T->str);
}

void ConcatString(String* S, String* T) {
    // 重新分配内存以容纳两个字符串和终止符
    S->str = (char*)realloc(S->str, (S->length + T->length + 1) * sizeof(char));

    // 检查内存分配是否成功
    if (S->str == NULL) {
        printf("Memory allocation failed\n");
        return;
    }

    // 使用 strcat_s 合并字符串
    strcat_s(S->str, S->length + T->length + 1, T->str);

    // 更新 S 的长度
    S->length += T->length;
}

void ReplaceString(String* S, String* T, String* V) {
    int pos;
    while ((pos = FindString(S, T)) != -1) {
        DeleteString(S, pos, T->length);
        InsertString(S, pos, V);
    }
}

// 二叉树功能实现
TreeNode* CreateTreeNode(int data) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

TreeNode* InsertTreeNode(TreeNode* root, int data) {
    if (root == NULL) {
        return CreateTreeNode(data);
    }
    if (data < root->data) {
        root->left = InsertTreeNode(root->left, data);
    }
    else {
        root->right = InsertTreeNode(root->right, data);
    }
    return root;
}

void PreOrder(TreeNode* root) {
    if (root) {
        printf("%d ", root->data);
        PreOrder(root->left);
        PreOrder(root->right);
    }
}

void InOrder(TreeNode* root) {
    if (root) {
        InOrder(root->left);
        printf("%d ", root->data);
        InOrder(root->right);
    }
}

void PostOrder(TreeNode* root) {
    if (root) {
        PostOrder(root->left);
        PostOrder(root->right);
        printf("%d ", root->data);
    }
}

void LevelOrder(TreeNode* root) {
    if (!root) return;
    Queue Q;
    InitQueue(&Q);
    EnQueue(&Q, (int)root);
    while (Q.front != Q.rear) {
        TreeNode* node = (TreeNode*)Q.data[Q.front];
        DeQueue(&Q, (int*)&node);
        printf("%d ", node->data);
        if (node->left) EnQueue(&Q, (int)node->left);
        if (node->right) EnQueue(&Q, (int)node->right);
    }
}

int CountLeaves(TreeNode* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return CountLeaves(root->left) + CountLeaves(root->right);
}

int CountNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + CountNodes(root->left) + CountNodes(root->right);
}

int TreeDepth(TreeNode* root) {
    if (!root) return 0;
    int leftDepth = TreeDepth(root->left);
    int rightDepth = TreeDepth(root->right);
    return (leftDepth > rightDepth ? leftDepth : rightDepth) + 1;
}

// 图功能实现
void InitGraph(Graph* G, int vertices) {
    G->numVertices = vertices;
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            G->adjMatrix[i][j] = 0;
        }
    }
}

void UpdateAdjMatrix(Graph* G, int u, int v, int weight) {
    G->adjMatrix[u][v] = weight;
}

void DFS(Graph* G, int v, int visited[]) {
    visited[v] = 1;
    printf("%d ", v);
    for (int i = 0; i < G->numVertices; i++) {
        if (G->adjMatrix[v][i] != 0 && !visited[i]) {
            DFS(G, i, visited);
        }
    }
}

void DFSTraversal(Graph* G, int startVertex) {
    int visited[MAX_VERTICES] = { 0 };
    DFS(G, startVertex, visited);
    printf("\n");
}

void BFSTraversal(Graph* G, int startVertex) {
    int visited[MAX_VERTICES] = { 0 };
    Queue Q;
    InitQueue(&Q);
    visited[startVertex] = 1;
    EnQueue(&Q, startVertex);
    while (Q.front != Q.rear) {
        int v;
        DeQueue(&Q, &v);
        printf("%d ", v);
        for (int i = 0; i < G->numVertices; i++) {
            if (G->adjMatrix[v][i] != 0 && !visited[i]) {
                visited[i] = 1;
                EnQueue(&Q, i);
            }
        }
    }
    printf("\n");
}

// 查找功能实现
int SequentialSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1;
}

int BinarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == key) {
            return mid;
        }
        else if (arr[mid] < key) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return -1;
}

// 排序功能实现
void InsertSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void ShellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}

void BubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int Partition(int arr[], int low, int high) {
    int pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= pivot) high--;
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) low++;
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}

void QuickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = Partition(arr, low, high);
        QuickSort(arr, low, pivot - 1);
        QuickSort(arr, pivot + 1, high);
    }
}

void SelectSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

void Heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        Heapify(arr, n, largest);
    }
}

void HeapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        Heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        Heapify(arr, i, 0);
    }
}
void Merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    // 动态分配内存创建数组 L 和 R
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));

    // 检查内存分配是否成功
    if (L == NULL || R == NULL) {
        printf("Memory allocation failed\n");
        return;
    }
    for (int i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    free(L);
    free(R);
}

void MergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        Merge(arr, l, m, r);
    }
}

// 菜单功能实现
void LinearListMenu() {
    LinearList L;
    InitList(&L);
    int choice, pos, elem;
    while (1) {
        printf("第十组刘中金负责该板块代码的编写");
        printf("\nLinear List Menu--线性表菜单:\n");
        printf("1. Insert--插入\n2. Delete--删除\n3. Locate Element--查找元素\n4. Get Element--获取元素\n5. List Length--线性表长\n6. Print List--打印线性表\n7. Return to Main Menu--返回主菜单\n");
        printf("Please enter your choice--请输入你的选择: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter position and element--输入位置和元素: ");
            scanf_s("%d %d", &pos, &elem);
            ListInsert(&L, pos, elem);
            break;
        case 2:
            printf("Enter position--输入位置:");
            scanf_s("%d", &pos);
            ListDelete(&L, pos);
            break;
        case 3:
            printf("Enter element--输入元素: ");
            scanf_s("%d", &elem);
            pos = LocateElem(&L, elem);
            if (pos) printf("Element found at position --在该位置找到元素%d\n", pos);
            else printf("Element not found--未找到该元素\n");
            break;
        case 4:
            printf("Enter position--输入位置: ");
            scanf_s("%d", &pos);
            elem = GetElem(&L, pos);
            if (elem != -1) printf("Element at position（在位置） %d is（的是） %d\n", pos, elem);
            else printf("Invalid position--无效的位置\n");
            break;
        case 5:
            printf("List length is--表长为： %d\n", ListLength(&L));
            break;
        case 6:
            PrintList(&L);
            break;
        case 7:
            return;
        default:
            printf("Invalid choice please enter again--无效的选择 请重新输入\n\n\n\n\n\n\n");
        }
    }
}

void StackMenu() {
    Stack S;
    InitStack(&S);
    int choice, elem;
    while (1) {
        printf("\nStack Menu:\n");
        printf("1. Push\n2. Pop\n3. Get Top\n4. Print Stack\n5. Decimal to Binary\n6. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter element: ");
            scanf_s("%d", &elem);
            Push(&S, elem);
            break;
        case 2:
            if (Pop(&S, &elem)) printf("Popped element is %d\n", elem);
            else printf("Stack is empty\n");
            break;
        case 3:
            if (GetTop(&S, &elem)) printf("Top element is %d\n", elem);
            else printf("Stack is empty\n");
            break;
        case 4:
            PrintStack(&S);
            break;
        case 5:
            printf("Enter decimal number: ");
            scanf_s("%d", &elem);
            DecimalToBinary(elem);
            break;
        case 6:
            return;
        default:
            printf("Invalid choice\n");
        }
    }
}

void QueueMenu() {
    Queue Q;
    InitQueue(&Q);
    int choice, elem;
    while (1) {
        printf("\nQueue Menu:\n");
        printf("1. EnQueue\n2. DeQueue\n3. Get Front\n4. Print Queue\n5. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter element: ");
            scanf_s("%d", &elem);
            EnQueue(&Q, elem);
            break;
        case 2:
            if (DeQueue(&Q, &elem)) printf("Dequeued element is %d\n", elem);
            else printf("Queue is empty\n");
            break;
        case 3:
            if (GetFront(&Q, &elem)) printf("Front element is %d\n", elem);
            else printf("Queue is empty\n");
            break;
        case 4:
            PrintQueue(&Q);
            break;
        case 5:
            return;
        default:
            printf("Invalid choice\n");
        }
    }
}

void StringMenu() {
    String S, T, V;
    char temp[100];
    int choice, pos, len;
    while (1) {
        printf("\nString Menu:\n");
        printf("1. Create New String\n2. Get SubString\n3. Insert String\n4. Delete String\n5. Find String\n6. Compare Strings\n7. Concatenate Strings\n8. Replace SubString\n9. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter string: ");
            scanf_s("%s", temp);
            S = InitString(temp);
            break;
        case 2:
            printf("Enter position and length: ");
            scanf_s("%d %d", &pos, &len);
            T = SubString(&S, pos, len);
            if (T.str) {
                printf("SubString is %s\n", T.str);
                free(T.str);
            }
            else {
                printf("Invalid position or length\n");
            }
            break;
        case 3:
            printf("Enter position and string to insert: ");
            scanf_s("%d %s", &pos, temp);
            T = InitString(temp);
            InsertString(&S, pos, &T);
            free(T.str);
            break;
        case 4:
            printf("Enter position and length to delete: ");
            scanf_s("%d %d", &pos, &len);
            DeleteString(&S, pos, len);
            break;
        case 5:
            printf("Enter string to find: ");
            scanf_s("%s", temp);
            T = InitString(temp);
            pos = FindString(&S, &T);
            if (pos != -1) printf("String found at position %d\n", pos);
            else printf("String not found\n");
            free(T.str);
            break;
        case 6:
            printf("Enter string to compare: ");
            scanf_s("%s", temp);
            T = InitString(temp);
            int cmp = CompareString(&S, &T);
            if (cmp == 0) printf("Strings are equal\n");
            else if (cmp > 0) printf("String S is greater\n");
            else printf("String S is smaller\n");
            free(T.str);
            break;
        case 7:
            printf("Enter string to concatenate: ");
            scanf_s("%s", temp);
            T = InitString(temp);
            ConcatString(&S, &T);
            free(T.str);
            break;
        case 8:
            printf("Enter string to replace and replacement: ");
            scanf_s("%s", temp);
            T = InitString(temp);
            scanf_s("%s", temp);
            V = InitString(temp);
            ReplaceString(&S, &T, &V);
            free(T.str);
            free(V.str);
            break;
        case 9:
            return;
        default:
            printf("Invalid choice\n");
        }
    }
}

void TreeMenu() {
    TreeNode* root = NULL;
    int choice, data;
    while (1) {
        printf("\nBinary Tree Menu:\n");
        printf("1. Insert\n2. PreOrder Traversal\n3. InOrder Traversal\n4. PostOrder Traversal\n5. LevelOrder Traversal\n6. Count Leaves\n7. Count Nodes\n8. Tree Depth\n9. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter data: ");
            scanf_s("%d", &data);
            root = InsertTreeNode(root, data);
            break;
        case 2:
            PreOrder(root);
            printf("\n");
            break;
        case 3:
            InOrder(root);
            printf("\n");
            break;
        case 4:
            PostOrder(root);
            printf("\n");
            break;
        case 5:
            LevelOrder(root);
            printf("\n");
            break;
        case 6:
            printf("Number of leaves: %d\n", CountLeaves(root));
            break;
        case 7:
            printf("Number of nodes: %d\n", CountNodes(root));
            break;
        case 8:
            printf("Tree depth: %d\n", TreeDepth(root));
            break;
        case 9:
            return;
        default:
            printf("Invalid choice\n");
        }
    }
}

void GraphMenu() {
    Graph G;
    int choice, vertices, u, v, weight;
    while (1) {
        printf("\nGraph Menu:\n");
        printf("1. Initialize Graph\n2. Update Adjacency Matrix\n3. DFS Traversal\n4. BFS Traversal\n5. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter number of vertices: ");
            scanf_s("%d", &vertices);
            InitGraph(&G, vertices);
            break;
        case 2:
            printf("Enter vertices (u v) and weight: ");
            scanf_s("%d %d %d", &u, &v, &weight);
            UpdateAdjMatrix(&G, u, v, weight);
            break;
        case 3:
            printf("Enter start vertex: ");
            scanf_s("%d", &u);
            DFSTraversal(&G, u);
            break;
        case 4:
            printf("Enter start vertex: ");
            scanf_s("%d", &u);
            BFSTraversal(&G, u);
            break;
        case 5:
            return;
        default:
            printf("Invalid choice\n");
        }
    }
}

void SearchMenu() {
    int arr[MAX_LIST_SIZE], n, choice, key, result;
    printf("Enter number of elements: ");
    scanf_s("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) {
        scanf_s("%d", &arr[i]);
    }
    while (1) {
        printf("\nSearch Menu:\n");
        printf("1. Sequential Search\n2. Binary Search\n3. Return to Main Menu\n");
        printf("Enter your choice: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            printf("Enter key to search: ");
            scanf_s("%d", &key);
            result = SequentialSearch(arr, n, key);
            if (result != -1) printf("Element found at position %d\n", result);
            else printf("Element not found\n");
            break;
        case 2:
            printf("Enter key to search: ");
            scanf_s("%d", &key);
            result = BinarySearch(arr, n, key);
            if (result != -1) printf("Element found at position %d\n", result);
            else printf("Element not found\n");
            break;
        case 3:
            return;
        default:
            printf("Invalid choice\n");
            break;
        }
    }
}

void SortMenu() {
    int arr[MAX_LIST_SIZE], n, choice;
    printf("Enter number of elements——请输入元素数量: ");
    scanf_s("%d", &n);
    printf("Enter elements——请输入元素:\n ");
    for (int i = 0; i < n; i++) {
        scanf_s("%d", &arr[i]);
    }
    while (1) {
        printf("\nSort Menu——排序操作菜单:\n");
        printf("1. Insert Sort--插入排序\n2. Shell Sort--希尔排序\n3. Bubble Sort--冒泡排序\n4. Quick Sort--快速排序\n5. Select Sort--选择排序\n6. Heap Sort——堆排序\n7. Merge Sort——归并排序\n8. Return to Main Menu——返回主菜单\n");
        printf("Enter your choice——请输入你的选择: ");
        scanf_s("%d", &choice);
        switch (choice) {
        case 1:
            InsertSort(arr, n);
            break;
        case 2:
            ShellSort(arr, n);
            break;
        case 3:
            BubbleSort(arr, n);
            break;
        case 4:
            QuickSort(arr, 0, n - 1);
            break;
        case 5:
            SelectSort(arr, n);
            break;
        case 6:
            HeapSort(arr, n);
            break;
        case 7:
            MergeSort(arr, 0, n - 1);
            break;
        case 8:
            return;
        default:
            printf("\n\n无效输入 请重新输入\n");
            break;
        }
        printf("\n\nSorted array——排序数组为: ");
        for (int i = 0; i < n; i++) printf("%d ", arr[i]);
        printf("\n");
    }
}

int main() {
    int choice;
    while (1) {
        printf("本系统由第十小组协作完成，欢迎您的使用\n\n\n");
        printf("组员1：刘成军  学号：2341209060324\n\n组员2：罗松   学号：2341209060331\n\n组员3：廖世权  学号：2341209060323\n\n组员4：刘中金  学号：2341209060325\n\n组员5：梅朝夕  学号：2341209060332\n\n\n");
        printf("\nMain Menu--主菜单(！！！！！请务必注意本系统仅支持数字0--9的输入 输入其它字符会有崩溃性情况发生！！！！！）:\n");
        printf("1. Linear List Operations——线性表\n2. Stack Operations——栈操作\n3. Queue Operations——队列操作\n4. String Operations——串操作\n5. Binary Tree Operations——二叉树操作\n6. Graph Operations——图操作\n7. Search Algorithms——查找操作\n8. Sorting Algorithms——排序操作\n9. Exit——退出本程序（真的确定退出吗？毕竟我这么可爱）\n");
        printf("Enter your choice——输入你的选择（当然你随时可以返回上一步，但人生可不会回到过去，换句话说，你应该谨慎选择: \n天呐 你选择了：");
        scanf_s("%d", &choice);
        printf("对于你的选择我想说：这很明智\n\n\n");
        switch (choice) {
        case 1:
            LinearListMenu();
            break;
        case 2:
            StackMenu();
            break;
        case 3:
            QueueMenu();
            break;
        case 4:
            StringMenu();
            break;
        case 5:
            TreeMenu();
            break;
        case 6:
            GraphMenu();
            break;
        case 7:
            SearchMenu();
            break;
        case 8:
            SortMenu();
            break;
        case 9:
            return 0;
        case 0:
            printf("你TM不长眼啊 这么大个菜单哪来的0 请下一次别瞎按\n\n\n");
        }
    }
    return 0;
}
