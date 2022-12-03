import { Code, Text } from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";

import { FormEvent, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";

const API_HOST = "http://127.0.0.1:8000";

const Index = () => {
  const [file, setFile] = useState(null);

  // Upload file
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    const headers = {
      "Content-Type": file.type,
    };
    await axios.post(`${API_HOST}/uploadfile`, formdata, headers).then();
  };
  
  // Change state
  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]); //store uploaded file in "file" variable with useState
  }
  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text color="text">
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
          <Code>TypeScript</Code>.
        </Text>
        {/* TODO: USE CHAKRA */}
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <input
            onChange={handleChange}
            name="files"
            type="file"
            accept=".csv"
          />
          <input type="submit" />
        </form>
      </Main>

      <DarkModeSwitch />
      {/* <Footer>
        <Text>Next ❤️ Chakra</Text>
      </Footer>
      <CTA /> */}
    </Container>
  );
};

export default Index;
