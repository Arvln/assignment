# Requirement

### frontend

- The left-side component library allows drag-and-drop functionality (Text components, Image components).
- The right-side preview feature enables components to open the editing functionality on the left when clicked in the preview pane. 
- The corresponding properties can be edited, with real-time updates reflected in the preview.

P.S. Feel free to adjust the UI layout as needed.

#### Additional Feature (Bonus)

- Include a carousel component.

### backend

Q1：Given the root of a binary tree, invert the tree, and return its root.(Don’t use recursion.)

example1:

input: [5, 3, 8, 1, 7, 2, 6]

ouput: [5, 8, 3, 6, 2, 7, 1]

example2:

input: [6, 8, 9]

output: [6, 9, 8]

example3:

input: [5, 3, 8, 1, 7, 2, 6, 100, 3, -1]

output: [5, 8, 3, 6, 2, 7, 1, null, null, null, null, null, -1, 3, 100]

example4:

input: []

output: []

Constraints: 
The number of nodes in the tree is in the range [0, 100]. 
-100 <= Node.val <= 100

Q2：Design a simple banking system with these features: (Typescript / Javascript
 / Golang)

- Implement System by restful API.
- Account balance cannot be negative.
- Create an account with name and balance.
- Able to deposit money to an account.
- Able to withdraw money from an account.
- Able to transfer money from one account to another account.
- Generate transaction logs for each account transfer(when, how much, to what
account).
- Support atomic transaction.
- Include unit tests & integration test
provide a docker container run server.

P.S. Do not worry about persisting the data, you can save everything in-memory.
