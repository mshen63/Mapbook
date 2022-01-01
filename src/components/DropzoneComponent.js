import {
    Center, Flex, Icon, Text
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillFileAdd } from 'react-icons/ai';

const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET

const DropzoneComponent = ({ setImgUrl, setFile, file}) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        const formData = new FormData();
        formData.append("file", file)
        formData.append("upload_preset", preset)
        fetch(url, {
            method: "POST",
            body: formData
        }).then(resp => {
            return resp.text()
        }).then((data) => {
            setImgUrl(JSON.parse(data).secure_url)
        }).then((e) => {
            setFile(Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        }).catch(e => toast.error("Photo invalid or too large!"))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1, multiple: false })
    return (
        <Flex align="center" justify="center" width="100%" height="50%">
            {file
                ? (<img src={file.preview} />)
                : (<Center
                    p={10}
                    cursor="pointer"
                    bg={isDragActive ? "gray.100" : 'transparent'}
                    transition="background-color 0.2s ease"
                    borderRadius={4}
                    border="3px dashed"
                    borderColor="gray.300"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    width="100%"
                    padding={20}
                    _hover={{ bg: "green.50", borderColor: "gray.400" }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} padding={20} />
                    <Icon as={AiFillFileAdd} mr={2} />
                    <Text fontSize="12px" color="gray.500">Add Image Here</Text>
                </Center>
                )
            }
        </Flex>
    )
}

export default DropzoneComponent;