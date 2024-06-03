import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useConnectedWallets } from "thirdweb/react";
import ForwardButton from "../assets/images/ForwardButton.png";
import BackButton from "../assets/images/GoBack.png";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "06bcfb42f1eeb14f3bdb12f16703ebb8",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("app.phantom"),
];

const questions = [
  {
    id: 1,
    question: "Do you support the proposed BeltLine expansion?",
    answers: ["Yes", "No"],
  },
  {
    id: 2,
    question: "Are you satisfied with the city's response to the recent increase in crime?",
    answers: ["Yes", "No"],
  },
  {
    id: 3,
    question: "Do you support the mayor's plan to invest in affordable housing?",
    answers: ["Yes", "No"],
  },
  {
    id: 4,
    question: "Do you support the city's new transportation plan?",
    answers: ["Yes", "No"],
  },
  {
    id: 5,
    question: "Can you afford your rent with your current salary?",
    answers: ["Yes", "No"],
  },
];

const Content = () => {
  const connectedWallets = useConnectedWallets();
  const [votes, setVotes] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleVote = (questionId, answer) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col text-center h-[70vh] mb-[2%] mt-[2%]">
      <div className="flex justify-between px-32 border mx-32 h-[90%] items-center">
        <div className="">
          <img className="mx-auto" src={Logo} alt="logo" width={80} />
          <p className="text-white">Atlanta's #1 Blockchain Voting Platform</p>
          {connectedWallets.length > 0 ? (
            <>
              <div className="mt-4 text-white">
                <p>{currentQuestion.question}</p>
                {currentQuestion.answers.map((answer) => (
                  <label key={answer} className="block m-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={answer}
                      checked={votes[currentQuestion.id] === answer}
                      onChange={() => handleVote(currentQuestion.id, answer)}
                      className="mr-2"
                    />
                    {answer}
                  </label>
                ))}
              </div>
              <div className="flex gap-6 mt-8 mr-20">
                <img
                  width={70}
                  src={BackButton}
                  alt="Back Button"
                  onClick={handlePreviousQuestion}
                  className="cursor-pointer"
                />
                <img
                  width={70}
                  src={ForwardButton}
                  alt="Forward Button"
                  onClick={handleNextQuestion}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-8 text-white">
                <p>Your Total Vote is:</p>
                <p>
                  Yes(
                  {Object.values(votes).filter((vote) => vote === "Yes").length}
                  )
                </p>
                <p>
                  No(
                  {Object.values(votes).filter((vote) => vote === "No").length})
                </p>
              </div>
            </>
          ) : (
            <div className="mt-4 text-white">
              <p>Please connect your wallet to view and answer questions.</p>
            </div>
          )}
        </div>
        <div className="border rounded-lg border-slate-600 w-[50%] h-[70%] bg-[#222831] leading-10 py-6">
          <p className="text-4xl text-center text-white">Connect your wallet</p>
          <p className="text-center text-white">Vote for proposals</p>
          <div className="flex justify-center my-8">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;