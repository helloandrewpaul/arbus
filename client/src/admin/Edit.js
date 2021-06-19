import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import Login from "./Login";
import useToken from "../Hooks/useToken";

const Edit = () => {
  let history = useHistory();
  const { _id } = useParams();
  const [error, setError] = useState();
  const [currentBook, setCurrentBook] = useState([]);
  const [updateBook, setUpdateBook] = useState({
    title: "",
    photographer: "",
    size: "",
    pages: "",
    images: "",
    edition: "",
    editionSize: "",
    publicationDate: "",
    publisher: "",
    language: "",
    printing: "",
    extraDetails: "",
    bookCover: "",
  });

  useEffect(() => {
    fetch(`/edit/${_id}`)
      .then((rest) => rest.json())
      .then((json) => {
        setCurrentBook({ ...json.data });
      });
  }, []);

  const cb = currentBook;
  useEffect(() => {
    if (cb.title) {
      setUpdateBook({ ...cb, title: cb.title });
    }
    if (cb.photographer) {
      setUpdateBook({ ...cb, photographer: cb.photographer });
    }
    if (cb.size) {
      setUpdateBook({ ...cb, size: cb.size });
    }
    if (cb.pages) {
      setUpdateBook({ ...cb, pages: cb.pages });
    }
    if (cb.edition) {
      setUpdateBook({ ...cb, edition: cb.edition });
    }
    if (cb.editionSize) {
      setUpdateBook({ ...cb, editionSize: cb.editionSize });
    }
    if (cb.publisher) {
      setUpdateBook({ ...cb, publisher: cb.publisher });
    }
    if (cb.language) {
      setUpdateBook({ ...cb, language: cb.language });
    }
    if (cb.printing) {
      setUpdateBook({ ...cb, printing: cb.printing });
    }
    if (cb.extraDetails) {
      setUpdateBook({ ...cb, extraDetails: cb.extraDetails });
    }
    if (cb.images) {
      setUpdateBook({ ...cb, images: cb.images });
    }
  }, [cb]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateBook({ ...updateBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/catalogue/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...updateBook }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        setError("error");
      });
    history.push(`/catalogue/${_id}`);
    history.go(0);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/catalogue/${_id}`);
  };

  const convertBase64 = (file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      };

      fileReader.onerror = (error) => {
        rej(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUpdateBook({ ...updateBook, images: base64 });
  };

  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <BigWrap>
      <FormWrap autocomplete="off">
        <InputGrid>
          <Input
            id="title"
            placeholder="Title"
            type="text"
            name="title"
            defaultValue={cb.title}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="photographer"
            placeholder="Photographer"
            type="text"
            name="photographer"
            defaultValue={cb.photographer}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="size"
            placeholder="Size"
            type="text"
            name="size"
            defaultValue={cb.size}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="pages"
            placeholder="Pages"
            type="text"
            name="pages"
            defaultValue={cb.pages}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="edition"
            placeholder="Edition"
            type="text"
            name="edition"
            defaultValue={cb.edition}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="editionSize"
            placeholder="Edition Size"
            type="text"
            name="editionSize"
            defaultValue={cb.editionSize}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="publicationDate"
            placeholder="Publication Date"
            type="text"
            name="publicationDate"
            defaultValue={cb.publicationDate}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="publisher"
            placeholder="Publisher"
            type="text"
            name="publisher"
            defaultValue={cb.publisher}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="language"
            placeholder="Language"
            type="text"
            name="language"
            defaultValue={cb.language}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="printing"
            placeholder="Printing"
            type="text"
            name="printing"
            defaultValue={cb.printing}
            onChange={(e) => handleChange(e)}
          />
          <Input
            id="image"
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
        </InputGrid>
        <TextArea
          id="extraDetails"
          placeholder="Extra Details"
          wrap="hard"
          type="text"
          name="extraDetails"
          defaultValue={cb.extraDetails}
          onChange={(e) => handleChange(e)}
        />
        <ButWrap>
          <Button onClick={(e) => handleSubmit(e)}>Update</Button>
          <Button onClick={(e) => handleCancel(e)}>Cancel</Button>

          <DelButton>Delete</DelButton>
        </ButWrap>
      </FormWrap>
    </BigWrap>
  );
};
const DelButton = styled.button`
  border: 2px solid #f00;
  padding: 5px;
  background-color: #f00;
  color: #fff;
  margin-left: 10px;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;
const ButWrap = styled.div`
  width: 600px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 619px) {
    width: 300px;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;
  @media (max-width: 619px) {
    grid-template-columns: 1fr;
  }
`;
const TextArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  margin-bottom: 15px;
  height: 300px;
  border: 2px solid #000;
  padding: 5px;
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  border: 2px solid #000;
  padding: 5px;
  background-color: #000;
  color: #fff;
  margin-left: 10px;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  border: 2px solid #000;
  padding: 5px;
  :focus {
    outline: none;
  }
`;

const BigWrap = styled.div``;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  justify-content: center;
  margin: 30px auto;
  @media (max-width: 619px) {
    width: 300px;
  }
`;
export default Edit;
