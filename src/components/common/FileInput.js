import { Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";


const FileInput = (props) => {
  const { name, label, height } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const files = watch(name);

  const onDrop = useCallback((droppedFiles) => {
    setValue(name, droppedFiles, { shouldValidate: true });
  }, [setValue, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    }
  }, [register, unregister, name]);

  return (
    <>
      <label className=" " htmlFor={name}>
        {label}
      </label>
      <div
        {...getRootProps()}
        type='file'
        role='button'
        aria-label='Subir archivo'
        id={name}
      >
        <input {...props} {...getInputProps()} />
        <div
          style={{
            width: '100%',
            border: 'dashed 2px lightgrey',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 5,
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: isDragActive ? '#f8f8f8' : 'white'
          }}>
          <Typography pt={3} pb={3}>Arrastra la imagen de perfil para subirla</Typography>
          {
            !!files?.length && (
              <div>
                {
                  files.map((file, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{
                            height: height || '150px'
                          }} />
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );

}

export default FileInput;