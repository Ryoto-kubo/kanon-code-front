import { ValidMessage } from "@/components/molecules/ValidMessage";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React from "react";

type InputProps = JSX.IntrinsicElements["input"];
type InputPostProps = InputProps & { title: string; isValidTitle: boolean };

export const InputPostTitleWrapper: React.FC<InputPostProps> = React.memo(
  (props) => {
    return (
      <>
        <Box mb={0.5}>
          <TextField
            id="title"
            type="text"
            fullWidth
            inputProps={{ style: { fontSize: 24, fontWeight: "bold" } }}
            value={props.title}
            onChange={props.onChange}
            placeholder={props.placeholder}
          />
        </Box>
        {props.isValidTitle && (
          <ValidMessage validText="32文字以下で入力してください" />
        )}
      </>
    );
  }
);
