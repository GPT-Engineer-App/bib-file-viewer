import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [bibtexContent, setBibtexContent] = useState("");
  const [parsedEntries, setParsedEntries] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setBibtexContent(content);
        parseBibtexContent(content);
      };
      reader.readAsText(file);
    }
  };

  const parseBibtexContent = (content) => {
    // Simulated parsing of BibTeX entries
    // This is a placeholder for actual parsing logic
    const entries = content
      .split("@")
      .filter((entry) => entry.trim() !== "")
      .map((entry) => "@" + entry.trim());
    setParsedEntries(entries);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">
          BibTeX Viewer
        </Heading>
        <Input type="file" accept=".bib" onChange={handleFileChange} />
        <Button leftIcon={<FaUpload />} colorScheme="teal" onClick={() => parseBibtexContent(bibtexContent)}>
          Upload and Parse BibTeX File
        </Button>
        {parsedEntries.length > 0 && (
          <Box mt={4}>
            <Heading as="h2" size="md">
              Parsed Entries:
            </Heading>
            {parsedEntries.map((entry, index) => (
              <Textarea key={index} value={entry} readOnly mt={2} />
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
