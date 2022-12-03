import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Code,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";

import { FormEvent, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";

const API_HOST = "http://127.0.0.1:8000";

const Index = () => {
  const [file, setFile] = useState(null);
  const [allInputOptions, setAllInputOptions] = useState([]);
  const [allOutputOptions, setAllOutputOptions] = useState([]);

  const [inputOptions, setInputOptions] = useState(null);
  const [outputOption, setOutputOption] = useState(null);

  // Upload file
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    const headers = {
      "Content-Type": file.type,
    };
    await axios
      .post(`${API_HOST}/uploadfile`, formdata, headers)
      .then((response) => {
        setAllInputOptions(response.data.allInputOptions);
        setAllOutputOptions(response.data.allOutputOptions);
      });
  };

  // Change file state
  const handleChange = (e) => {
    setFile(e.target.files[0]); //store uploaded file in "file" variable with useState
  };

  const handleTrainModel = async () => {
    const formdata = new FormData();
    formdata.append("file", file);
    // const headers = {
    //   "Content-Type": file.type,
    // };
    const postData = {
      formdata,
      inputOptions,
      outputOption,
    };

    await axios
      .post(`${API_HOST}/train_model`, postData)
      .then((response) => {});
  };

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <form onSubmit={(e) => handleFileSubmit(e)} encType="multipart/form-data">
          <Input
            onChange={handleChange}
            name="files"
            type="file"
            accept=".csv"
          />
          <Input type="submit" />
        </form>
        {allInputOptions.length > 0 && (
          <FormControl as="fieldset">
            <FormLabel as="legend">Select input features</FormLabel>
            <CheckboxGroup onChange={setInputOptions}>
              <HStack spacing="24px">
                {allInputOptions.map((inputOption) => (
                  <Checkbox key={inputOption} value={inputOption}>{inputOption}</Checkbox>
                ))}
              </HStack>
            </CheckboxGroup>
          </FormControl>
        )}
        {allOutputOptions.length > 0 && (
          <FormControl as="fieldset">
            <FormLabel as="legend">Select output feature</FormLabel>
            <RadioGroup onChange={setOutputOption}>
              <HStack spacing="24px">
                {allOutputOptions.map((outputOption) => (
                  <Radio key={outputOption} value={outputOption}>{outputOption}</Radio>
                ))}
              </HStack>
            </RadioGroup>
          </FormControl>
        )}
        {inputOptions && outputOption && (
          <Button onClick={handleTrainModel}>Train model</Button>
        )}
      </Main>

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
