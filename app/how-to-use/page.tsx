import React from "react";

const HowToUse = () => {
  return (
    <div className="how-to-use-section lg:mx-20 mx-5 p-4">
      <h2 className="text-2xl font-bold mb-4">
        How to Use the "Fatwa with AI" Web App
      </h2>
      <div className="step mb-6">
        <h3 className="text-xl font-semibold">1. Visit the Website:</h3>
        <p>
          Go to{" "}
          <a
            href="https://fatwa-with-ai.vercel.app"
            className="text-blue-500 underline"
          >
            Fatwa with AI
          </a>{" "}
          to start exploring.
        </p>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">2. Ask a Question:</h3>
        <ul className="list-disc list-inside">
          <li>
            On the homepage, you'll find a search bar where you can type your
            Islamic question.
          </li>
          <li>
            Type your question clearly, then press <strong>Enter</strong> or
            click the <strong>Ask</strong> button to submit.
          </li>
        </ul>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">3. Get an Answer:</h3>
        <p>
          Once your question is submitted, the AI system will generate a
          response based on authentic Islamic sources. You’ll see the answer
          displayed on the same page, giving you a detailed explanation.
        </p>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">4. Browse Common Questions:</h3>
        <p>
          If you’re unsure what to ask, scroll through the list of common or
          recent questions on the homepage. You can click on any question to
          view its detailed answer.
        </p>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">5. Explore Categories:</h3>
        <p>
          The website is organized into different categories like{" "}
          <strong>Prayer (Salah)</strong>,<strong> Fasting (Sawm)</strong>,{" "}
          <strong>Zakat</strong>, etc. You can browse these categories to find
          questions and answers related to specific Islamic topics.
        </p>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">6. Language Options:</h3>
        <p>
          If available, choose your preferred language for reading the answers
          by selecting the language option from the menu.
        </p>
      </div>

      <div className="step mb-6">
        <h3 className="text-xl font-semibold">7. Feedback and Improvements:</h3>
        <p>
          You can give feedback on the answers by clicking the feedback button
          (if available) to help improve the quality of the AI responses.
        </p>
      </div>
    </div>
  );
};
export default HowToUse;
