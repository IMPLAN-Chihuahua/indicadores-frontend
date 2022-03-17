import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const PassField = () => {
const [values, setValues] = React.useState({
	password: "",
	showPassword: false,
});

const handleClickShowPassword = (e) => {
	setValues({ ...values, showPassword: !values.showPassword });
};

const handleMouseDownPassword = (event) => {
	event.preventDefault();
};

const handlePasswordChange = (prop) => (event) => {
	setValues({ ...values, [prop]: event.target.value });
};

return (
	<Input
        style={{width: '100%'}}
		type={values.showPassword ? "text" : "password"}
		onChange={handlePasswordChange("password")}
		value={values.password}
		endAdornment={
		<InputAdornment position="end">
			<span
            style={{cursor:'pointer'}}
			onClick={handleClickShowPassword}
			onMouseDown={handleMouseDownPassword}
			>
			{values.showPassword ? <Visibility /> : <VisibilityOff />}
			</span>
		</InputAdornment>
		}
	/>
);
};

export default PassField;
