# 🧠 LangChain Arithmetic Agent with LangGraph

This project demonstrates an intelligent agent built using **LangChain** and **LangGraph**. It uses OpenAI's `gpt-4o` model to interpret and perform arithmetic operations such as **addition**, **subtraction**, **multiplication**, and **division** through tool calling.

---

## 🚀 Features

- Parses natural language arithmetic expressions like:
  > "Add 3 and 4, multiply by 2, and subtract 1"
- Custom tool implementation using LangChain.
- Dynamic conditional routing via LangGraph.
- Automatically determines whether to re-run tools based on the LLM's response.

---

## 🛠️ Tech Stack

- LangChain
- LangGraph
- OpenAI GPT-4o or Gemini 1.5 pro
- Zod (Schema Validation)
- dotenv

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/langchain-arithmetic-agent.git
   cd langchain-arithmetic-agent
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the project**
   ```bash
   node index.js
   ```

---

## 💡 Example Usage

```js
const messages = [
  {
    role: "user",
    content: "Add 3 and 4. multiply by 2 and sub by 1 ",
  },
];
```

Expected Output:

```js
{
  messages: [
    {
      role: "assistant",
      content: "The result is 13.",
    },
  ];
}
```

---

## ⚙️ How It Works

- **Tools**: Defined with LangChain's `tool` abstraction using `zod` schemas.
- **LLM Call**: `llmCall` node sends messages to GPT-4o with instructions.
- **ToolNode**: Executes any tool calls triggered by the LLM.
- **Conditional Routing**: Based on whether tools are requested, either loops back or ends the process.

---

## 📚 LangChain vs LangGraph vs LangSmith

| Feature             | **LangChain**                  | **LangGraph**                                   | **LangSmith**                                       |
| ------------------- | ------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| **Purpose**         | Framework for LLM applications | Graph-based orchestration for agent workflows   | Observability and debugging tool for LangChain apps |
| **Execution Model** | Chains, tools, agents          | Directed graph with conditional edges           | Logging, tracing, evaluation                        |
| **Focus**           | Tool binding, chaining, agents | Conditional logic, planning, and execution flow | Monitoring, debugging, and analyzing LLM runs       |
| **Observability**   | Minimal                        | Minimal                                         | Full tracing, telemetry, and comparison tools       |
| **Ideal For**       | Prototyping AI apps            | Designing complex agent behaviors               | Improving production systems with visibility        |

---

## 🔗 Resources

- Youtube referenec https://www.youtube.com/watch?v=_XMwQ5X3llA&t=2071s&ab_channel=PiyushGarg
- [LangChain Documentation](https://docs.langchain.com/)
- [LangGraph (JS) Documentation](https://js.langchain.com/docs/langgraph)
- [LangSmith](https://smith.langchain.com/)
