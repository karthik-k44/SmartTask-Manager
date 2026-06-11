import { useAppDispatch } from "../../../redux/hook";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/types";
import { AuthType, UserRole } from "../../../types/user-authentication";
import { CreateUser, LoginUser, GetUserById } from "../../../redux/action";

interface CreateAndLoginFormProps {
  formType: AuthType;
  onLoginSuccess: () => void;
}

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
    if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
    ) {
        return (error as { message: string }).message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallbackMessage;
};

const CreateAndLoginFormHook = ({ formType, onLoginSuccess }: CreateAndLoginFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: UserRole.USER
        },

        validationSchema: Yup.object({
            name: formType === AuthType.SIGN_UP ? Yup.string().required('Name is required') : Yup.string(),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (formType === AuthType.SIGN_UP) {
                    const user = await dispatch(CreateUser({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        role: values.role
                    })).unwrap();
                    formik.resetForm();
                    onLoginSuccess();
                    toast.success('User created successfully');
                    if (user.role === UserRole.ADMIN) {
                      navigate(ROUTES.ADMIN_DASHBOARD);
                    } else {
                      navigate(ROUTES.PORTAL);
                    }
                    return;
                }

                await dispatch(LoginUser({
                    email: values.email,
                    password: values.password,
                })).unwrap();

                const currentUser = await dispatch(GetUserById()).unwrap();
                formik.resetForm();
                onLoginSuccess();
                toast.success('User logged in successfully');
                if (currentUser.role === UserRole.ADMIN) {
                  navigate(ROUTES.ADMIN_DASHBOARD);
                } else {
                  navigate(ROUTES.PORTAL);
                }
            } catch (error) {
                toast.error(
                    getErrorMessage(
                        error,
                        formType === AuthType.SIGN_UP ? 'Unable to create user' : 'Unable to login',
                    ),
                );
            }
        },
    });

    return {
        formik,
    };
}

export default CreateAndLoginFormHook;
