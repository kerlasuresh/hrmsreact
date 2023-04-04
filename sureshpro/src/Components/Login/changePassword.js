import React from "react";
import { useForm } from "react-hook-form";
const ChangePassword = () => {
    document.title = "HRMS | Change Password";
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm({});
    const onSubmit = () => {

    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 " >
                        <div className='loginform mt-4 changepassword'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='login-form-header mb-3'>
                                    <h5>Change Password</h5>

                                </div>

                                <div className='form-group mb-4'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Old Password'
                                        id='currentPassword'
                                        {...register("currentPassword", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
                                                //  (?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])at least one special chareacter
                                                message:
                                                    'Password should contain at least one digit & one lower case & one upper case & length will be minimum 8 characters ',
                                            },
                                        })}
                                        onKeyUp={() => {
                                            trigger("currentPassword");
                                        }}
                                    />
                                    {errors.currentPassword && (
                                        <small className='text-danger font-bold'  >
                                            {errors.currentPassword.message}
                                        </small>
                                    )}
                                </div>

                                <div className='form-group mb-4'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter New Password'
                                        id='newPassword'
                                        {...register("newPassword", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
                                                //  (?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])at least one special chareacter
                                                message:
                                                    'Password should contain at least one digit & one lower case & one upper case & length will be minimum 8 characters ',
                                            },
                                        })}
                                        onKeyUp={() => {
                                            trigger("newPassword");
                                        }}
                                    />
                                    {errors.newPassword && (
                                        <small className='text-danger font-bold'>
                                            {errors.newPassword.message}
                                        </small>
                                    )}
                                </div>
                                <div className='form-group mb-4'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Confirm Password'
                                        id='newPasswordconfirm'
                                        {...register("newPasswordconfirm", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
                                                //  (?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])at least one special chareacter
                                                message:
                                                    'Password should contain at least one digit & one lower case & one upper case & length will be minimum 8 characters ',
                                            },
                                        })}
                                        onKeyUp={() => {
                                            trigger("newPasswordconfirm");
                                        }}
                                    />
                                    {errors.newPasswordconfirm && (
                                        <small className='text-danger font-bold'>
                                            {errors.newPasswordconfirm.message}
                                        </small>
                                    )}
                                </div>
                                <div className='text-center mt-5 mb-3'>
                                    <button type='submit' className='btn'>
                                        Change Password
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChangePassword;