import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.OPENAI_API_KEY);

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
});

const multiply = tool(
  async ({ a, b }) => {
    return a * b;
  },
  {
    name: "multiply",
    description: "multiply two numbers together",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }) => {
    return a + b;
  },
  {
    name: "add",
    description: "add two numbers together",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const sub = tool(
  async ({ a, b }) => {
    return a - b;
  },
  {
    name: "sub",
    description: "sub two numbers together",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const div = tool(
  async ({ a, b }) => {
    return a / b;
  },
  {
    name: "div",
    description: "div two numbers together",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const tools = [add, sub, multiply, div];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

//Nodes
async function llmCall(state) {
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs",
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}

const toolNodes = new ToolNode(tools);

//conditional function to again route to tool or not
function shouldContiune(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  return "__end__";
}

//Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNodes)
  //Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContiune, {
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

//Invoke
const messages = [
  {
    role: "user",
    content: "Add 3 and 4. multiply by 2 and sub by 1 ",
  },
];

const result = await agentBuilder.invoke({ messages });
console.log(result);
