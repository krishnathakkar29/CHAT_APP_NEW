// import React, { useState } from "react";
// import {
//   Avatar,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { useFileHandler, useInputValidation } from "6pp";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
// import { usernameValidator } from "../utils/validators";
// import { bgGradient } from "../constant/color";
// import ParticleRing from "../components/ParticleRing";

// let user = true;
// function Login() {
//   const [isLogin, setIsLogin] = useState(true);

//   const username = useInputValidation("", usernameValidator);
//   const password = useInputValidation("");
//   const name = useInputValidation("");
//   const bio = useInputValidation("");

//   const avatar = useFileHandler("single");

//   const toggleLogin = () => setIsLogin((prev) => !prev);
//   const handleLogin = (e) => {
//     e.preventDefault();
//   };
//   const handleSignUp = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <div
//       style={{
//         backgroundImage: bgGradient,
//       }}
//     >
//       {/*  <div style={{ position: "relative", height: "100vh" }}> */}

//       <Container
//         component={"main"}
//         maxWidth="xs"
//         sx={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {isLogin ? (
//             <>
//               <Typography variant="h5">Login</Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "1rem",
//                 }}
//                 onSubmit={handleLogin}
//               >
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />

//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   //   disabled={isLoading}
//                 >
//                   Login
//                 </Button>

//                 <Typography textAlign={"center"} m={"1rem"}>
//                   OR
//                 </Typography>

//                 <Button
//                   //   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   onClick={toggleLogin}
//                 >
//                   Sign Up Instead
//                 </Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Typography variant="h5">Sign Up</Typography>
//               <form
//                 style={{
//                   width: "100%",
//                   marginTop: "1rem",
//                 }}
//                 onSubmit={handleSignUp}
//               >
//                 <Stack position={"relative"} width={"10rem"} margin={"auto"}>
//                   <Avatar
//                     sx={{
//                       width: "10rem",
//                       height: "10rem",
//                       objectFit: "contain",
//                     }}
//                     // src={avatar.preview}
//                   />

//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       bottom: "0",
//                       right: "0",
//                       color: "white",
//                       bgcolor: "rgba(0,0,0,0.5)",
//                       ":hover": {
//                         bgcolor: "rgba(0,0,0,0.7)",
//                       },
//                     }}
//                     component="label"
//                   >
//                     <>
//                       <CameraAltIcon />
//                       <VisuallyHiddenInput
//                         type="file"
//                         onChange={avatar.changeHandler}
//                       />
//                     </>
//                   </IconButton>
//                 </Stack>

//                 {avatar.error && (
//                   <Typography
//                     m={"1rem auto"}
//                     width={"fit-content"}
//                     display={"block"}
//                     color="error"
//                     variant="caption"
//                   >
//                     {avatar.error}
//                   </Typography>
//                 )}

//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   margin="normal"
//                   variant="outlined"
//                   value={name.value}
//                   onChange={name.changeHandler}
//                 />

//                 <TextField
//                   required
//                   fullWidth
//                   label="Bio"
//                   margin="normal"
//                   variant="outlined"
//                   value={bio.value}
//                   onChange={bio.changeHandler}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />

//                 {username.error && (
//                   <Typography color="error" variant="caption">
//                     {username.error}
//                   </Typography>
//                 )}

//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />

//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                   }}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   //   disabled={isLoading}
//                 >
//                   Sign Up
//                 </Button>

//                 <Typography textAlign={"center"} m={"1rem"}>
//                   OR
//                 </Typography>

//                 <Button
//                   //   disabled={isLoading}
//                   fullWidth
//                   variant="text"
//                   onClick={toggleLogin}
//                 >
//                   Login Instead
//                 </Button>
//               </form>
//             </>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { usernameValidator } from "../utils/validators";
import ParticleRing from "../components/ParticleRing";
import axios from "axios";
import { server } from "@/constant/config";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userExists } from "@/redux/reducers/auth";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const name = useInputValidation("");
  const bio = useInputValidation("");

  const avatar = useFileHandler("single");

  const toggleLogin = () => setIsLogin((prev) => !prev);
  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(userExists(data.user));

      toast.success(data?.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));

      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        // backgroundColor: "#1E293B",
      }}
    >
      <ParticleRing />
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            position: "relative",
            backdropFilter: "blur(10px)",
            backgroundColor: "#1E293B",
            color: "#E2E8F0",
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "16px",
            boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
            WebkitBackdropFilter: "bblur(0px)",
            border: "1px solid rgba(255, 255, 255, 1)",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" sx={{ color: "#E2E8F0" }}>
                Login
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  InputLabelProps={{
                    style: { color: "#94A3B8" }, // Label color
                  }}
                  InputProps={{
                    style: { color: "#E2E8F0" }, // Text color
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#6B7280", // Adjust to match the background color
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputLabelProps={{
                    style: { color: "#CBD5E1" },
                  }}
                  InputProps={{
                    style: { color: "#CBD5E1" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#4B5563", // Button background color
                    color: "#E2E8F0", // Button text color
                    "&:hover": {
                      backgroundColor: "#2563EB",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1rem"}
                  sx={{ color: "#E2E8F0" }}
                >
                  OR
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{ color: "#3B82F6" }} // Link color
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ color: "#E2E8F0" }}>
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                      bgcolor: "#94A3B8", // Avatar background color
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                  InputLabelProps={{
                    style: { color: "#94A3B8" },
                  }}
                  InputProps={{
                    style: { color: "#E2E8F0" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  InputLabelProps={{
                    style: { color: "#94A3B8" },
                  }}
                  InputProps={{
                    style: { color: "#E2E8F0" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  InputLabelProps={{
                    style: { color: "#94A3B8" },
                  }}
                  InputProps={{
                    style: { color: "#E2E8F0" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                      },
                    },
                  }}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputLabelProps={{
                    style: { color: "#94A3B8" },
                  }}
                  InputProps={{
                    style: { color: "#E2E8F0" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#3B82F6",
                    color: "#E2E8F0",
                    "&:hover": {
                      backgroundColor: "#4B5563",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1rem"}
                  sx={{ color: "#E2E8F0" }}
                >
                  OR
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{ color: "#3B82F6" }}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
