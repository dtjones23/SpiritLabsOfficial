import { useState } from "react";
import { Modal, Box, TextField, Button, Tab, Tabs } from "@mui/material";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN, REGISTER } from "../utils/mutations";

const AuthModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN);
  const [register, { loading: signupLoading, error: signupError }] = useMutation(REGISTER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = isLogin
        ? await login({ variables: { email: formData.email, password: formData.password } })
        : await register({ variables: { username: formData.username, email: formData.email, password: formData.password } });

      Auth.login(data?.login?.token || data?.register?.token);
      onClose();
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "solid 2px #1D1D1D",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} sx={{ mb: "8px" }}>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>

        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
        {!isLogin && <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />}
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: "16px" }} fullWidth disabled={loginLoading || signupLoading}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>

        {loginError && <p className="text-red-600 mt-2">{loginError.message}</p>}
        {signupError && <p className="text-red-600 mt-2">{signupError.message}</p>}
      </Box>
    </Modal>
  );
};

export default AuthModal;
