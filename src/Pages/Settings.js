import { MenuItem, TextField } from "@mui/material";
import Categories from "../Data/Categories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!category || !difficulty || !amount || !username) {
      setErrorMessage("Please fill all the field");
    } else {
      navigate("/Question", {
        state: { category, difficulty, amount, username },
      });
    }
  };

  return (
    <div className="trivia">
      <form className="trivia-box">
        <div className="head">
          <h1>Trivia Time</h1>
        </div>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <TextField
          label="Enter Your Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          select
          label="Choose no.of Question"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          style={{ textAlign: "start" }}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="15">15</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="25">25</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </TextField>

        <TextField
          select
          label="Select Category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          style={{ textAlign: "start" }}
        >
          {Categories.map((cat) => (
            <MenuItem key={cat.category} value={cat.value}>
              {cat.category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
          style={{ textAlign: "start" }}
        >
          <MenuItem key="Easy" value="easy">
            Easy
          </MenuItem>
          <MenuItem key="Medium" value="medium">
            Medium
          </MenuItem>
          <MenuItem key="Hard" value="hard">
            hard
          </MenuItem>
        </TextField>
        <button className="bu" type="button" onClick={handleSubmit}>
          Start Trivia
        </button>
      </form>
    </div>
  );
};

export default Settings;
