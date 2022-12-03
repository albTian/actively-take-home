import { Code, Text } from "@chakra-ui/react";
import axios from "axios";

import { FormEvent, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";

const API_HOST = "http://127.0.0.1:8000";

const Index = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  // const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("event");
  //   console.log(e);
  //   console.log("event.target");
  //   console.log(e.target);
  // };

  //when upload button clicked
  const handleFileSubmit = async (e) => {
    e.preventDefault()
    console.log(file[0].name);
    const formdata = new FormData();
    formdata.append("file", file[0]);
    const headers = { "Content-Type": file[0].type };
    await axios.post(`${API_HOST}/uploadfile`, formdata, headers).then();
  };
  // this is when file has been selected
  function handleChange(e) {
    console.log(e.target.files)
    setFile(e.target.files); //store uploaded file in "file" variable with useState
  }
  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text color="text">
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
          <Code>TypeScript</Code>.
        </Text>
        {/* <Button>
        <FileDrop onTargetClick={onTargetClick} children={""} />
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
          />
        </Button>
        <Button onClick={handleButtonClick}>upload file</Button> */}

        <form
          // action={`${API_HOST}/uploadfile/`}
          // encType="multipart/form-data"
          // method="post"
          onSubmit={(e) => handleFileSubmit(e)}
        >
          <input onChange={handleChange} name="files" type="file" />
          <input type="submit" />
        </form>

        {/* <List spacing={3} my={0} color="text">
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://nextjs.org"
              flexGrow={1}
              mr={2}
            >
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List> */}
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
