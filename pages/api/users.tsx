const users = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Jane Doe" },
];

export default function handler(req: any, res: any) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
      res.status(200).json({ users });
    });
}
