import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Divider,
  Fade
} from "@mui/material";
import "./App.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post( 
        `${API_URL}/api/email/generate`,
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      bgcolor: "#FAF9F6", 
      py: 6 
    }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 1, 
            border: "1px solid #E5E5E5",
            bgcolor: "#FFFFFF"
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 500, 
              color: "#1A1A1A", 
              textAlign: "center", 
              letterSpacing: "-0.02em",
              mb: 5 
            }}
          >
            Email Reply Generator
          </Typography>

          <Stack spacing={4}>
            <TextField
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ 
                "& .MuiOutlinedInput-root": { bgcolor: "#FAFAFA" } 
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#666" }}>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                sx={{ bgcolor: "#FAFAFA" }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              disableElevation
              sx={{ 
                py: 1.8, 
                borderRadius: 0, 
                textTransform: "uppercase", 
                letterSpacing: "0.1em",
                fontWeight: 600,
                bgcolor: "#1A1A1A", 
                "&:hover": { bgcolor: "#333333" },
                "&.Mui-disabled": { bgcolor: "#EAEAEA" }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : "Generate Reply"}
            </Button>
          </Stack>

          {error && (
            <Typography color="error" sx={{ mt: 3, textAlign: "center", fontSize: "0.85rem", fontWeight: 500 }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Fade in={!!generatedReply}>
              <Box sx={{ mt: 6 }}>
                <Divider sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Output
                  </Typography>
                </Divider>
                
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: "#444" }}>
                  Generated Reply:
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={generatedReply || ""}
                  inputProps={{ readOnly: true }}
                  sx={{ 
                    mb: 3,
                    "& .MuiOutlinedInput-root": { 
                      bgcolor: "#FDFDFD",
                      color: "#333",
                      lineHeight: 1.6
                    } 
                  }}
                />

                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                  sx={{ 
                    color: "#666", 
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    "&:hover": { color: "#000", bgcolor: "transparent", textDecoration: "underline" }
                  }}
                >
                  Copy To Clipboard
                </Button>
              </Box>
            </Fade>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;