import { createElement, createElement as h } from "vdom";

// const element = <h1 title="foo">Hello</h1>
// const element = <h1 title="foo"><span>Hello</span></h1>
// const element = <h1 title="foo"><span>Hello</span> World</h1>
const element = (<div>{[1, 3, 5].map(item => <div>{item}</div>)}</div>)

console.log(element)
