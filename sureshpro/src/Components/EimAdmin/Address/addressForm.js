import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const AddressForm = ({ onSubmitCustom, onloadvaluesid, onloadvalues, handleClose, type }) => {
    const [textDisplay, settextDisplay] = useState("Add");
    const [showTitle, setshowTitle] = useState(true);
    const { register, handleSubmit, trigger, formState: { errors }, setValue } = useForm();
    const onSubmit = (data) => { onSubmitCustom(data);
    setDisable(true); }
    const Close = () => { handleClose(); }
    const [loading, setLoading] = useState(false);
     const [disable, setDisable] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (type === "Register" || type === "Corporate") {
            if (type === "Register") {
                setValue("AddressL1", onloadvalues.registeredAdressLine1)
                setValue("AddressL2", onloadvalues.registeredAdressLine2)
                setValue("City", onloadvalues.registeredCity)
                setValue("State", onloadvalues.registeredState)
                setValue("Country", onloadvalues.registeredCountry)
                setValue("Pincode", onloadvalues.registeredPincode)
            }

            if (type === "Corporate") {
                setValue("AddressL1", onloadvalues.corporateAdressLine1)
                setValue("AddressL2", onloadvalues.corporateAdressLine2)
                setValue("City", onloadvalues.corporateCity)
                setValue("State", onloadvalues.corporateState)
                setValue("Country", onloadvalues.corporateCountry)
                setValue("Pincode", onloadvalues.corporatePincode)
            }
            setshowTitle(false);
            settextDisplay("Update")
        }
        if (type === "custom") {
            setshowTitle(true);
            settextDisplay("Update")
            if (onloadvaluesid) {
                //getCustomAddressByID(onloadvaluesid)
                setValue("AddressTittle", onloadvalues.addressTitle)
                setValue("AddressL1", onloadvalues.addressLine1)
                setValue("AddressL2", onloadvalues.addressLine2)
                setValue("City", onloadvalues.city)
                setValue("State", onloadvalues.state)
                setValue("Country", onloadvalues.country)
                setValue("Pincode", onloadvalues.pincode)
            } else {
                setLoading(true);
            }

        }
    }, [])
    return (
        <>
            {loading ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        {showTitle ?
                            <div className='col-md-12'>
                                <label className='label-form'>Address Title</label>
                                <input
                                    className='form-control'
                                    {...register("AddressTittle", {
                                        required: "This field is required",
                                    })}
                                    onKeyUp={() => {
                                        trigger("AddressTittle");
                                    }}
                                />{" "}
                                {errors.AddressTittle && (
                                    <small className='text-danger'>
                                        {errors.AddressTittle.message}
                                    </small>
                                )}
                            </div> : ""}
                        <div className='col-md-12'>
                            <label className='label-form'>Address Line1</label>
                            <input
                                className='form-control'
                                {...register("AddressL1", {
                                    required: "This field is required",
                                })}
                                onKeyUp={() => {
                                    trigger("AddressL1");
                                }}
                            />{" "}
                            {errors.AddressL1 && (
                                <small className='text-danger'>
                                    {errors.AddressL1.message}
                                </small>
                            )}
                        </div>
                        <div className='col-md-12'>
                            <label className='label-form'>Address Line2</label>
                            <input
                                className='form-control'
                                {...register("AddressL2", {
                                    required: "This field is required",
                                })}
                                onKeyUp={() => {
                                    trigger("AddressL2");
                                }}
                            />{" "}
                            {errors.AddressL2 && (
                                <small className='text-danger'>
                                    {errors.AddressL2.message}
                                </small>
                            )}
                        </div>
                        <div className='col-md-3'>
                            <label className='label-form'>City</label>
                            <input
                                className='form-control'
                                {...register("City", {
                                    required: "This field is required",
                                    pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces but not accepted space at 1st character",
                        },
                                })}
                                onKeyUp={() => {
                                    trigger("City");
                                }}
                            />{" "}
                            {errors.City && (
                                <small className='text-danger'>{errors.City.message}</small>
                            )}
                        </div>

                        <div className='col-md-3'>
                            <label className='label-form'>Country</label>
                          
                            <input
                                className='form-control'
                                {...register("Country", {
                                    required: "This field is required",
                                   pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces but not accepted space at 1st character",
                        },
                                })}
                                onKeyUp={() => {
                                    trigger("Country");
                                }}
                            />
                            {errors.Country && (
                                <small className='text-danger'>
                                    {errors.Country.message}
                                </small>
                            )}
                        </div>
                        <div className='col-md-3'>
                            <label className='label-form'>State</label>
                           
                            <input
                                className='form-control'
                                {...register("State", {
                                    required: "This field is required",
                                   pattern: {
                          value: /^[A-Za-z][A-Za-z-\s]+$/,
                          message: "This field allow only alphabets and spaces but not accepted space at 1st character",
                        },
                                })}
                                onKeyUp={() => {
                                    trigger("State");
                                }}
                            />
                            {errors.State && (
                                <small className='text-danger'>{errors.State.message}</small>
                            )}
                        </div>
                        <div className='col-md-3'>
                            <label className='label-form'>Pincode</label>
                            <input
                                className='form-control'
                                {...register("Pincode", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Only numbers are allowed", // JS only: <p>error message</p> TS only support string
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Please enter 6 digits pincode", // JS only: <p>error message</p> TS only support string
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: "Please enter 6 digits pincode", // JS only: <p>error message</p> TS only support string
                                    },
                                })}
                                onKeyUp={() => {
                                    trigger("Pincode");
                                }}
                            />{" "}
                            {errors.Pincode && (
                                <small className='text-danger'>
                                    {errors.Pincode.message}
                                </small>
                            )}
                        </div>
                    </div>
                    <br />
                    <div className="text-right">
                        <Button variant='secondary' onClick={() => Close()}>
                            Close
                        </Button>&nbsp;
                        <Button variant='primary' type='submit' disabled={disable}>
                            {textDisplay}
                        </Button>
                    </div>
                </form>
                : "Loading"}
        </>
    )
}

export default AddressForm;