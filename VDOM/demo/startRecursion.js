import { recursion } from "vdom";
const root = document.getElementById("root");
const obj = recursion(root, {});
console.log(obj);
