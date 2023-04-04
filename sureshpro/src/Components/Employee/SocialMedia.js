import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const SocialMedia = () => {
  const [socialMediaPopUp, setSocialMediaPopUp] = useState(false)
  const [socialMedia, setSocialMedia] = useState({})
  const [socialMediaId, setSocialMediaId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm()

  //=======================//
  const getDetialsMedia = async () => {
    var userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    var req = {
      company_name: userInfo.Company_Name,
    }
    await axios
      .post('/socialmedia_get/', req)
      .then((result) => {
        console.log('res', result)
        setSocialMedia(result.data.detail)
        setSocialMediaId(result.data.detail.id)
        setValue('linkedinUrl', result.data.detail.linkedin)
        setValue('fbUrl', result.data.detail.facebook)
        setValue('twitterUrl', result.data.detail.twitter)
      })
      .catch((err) => {
        console.log('error resp', err)
      })
  }

  //======================================//
  const handleClose = () => {
    setSocialMediaPopUp(false)
  }
  //===================//
  const onUpdateSocialSubmit = async (data) => {
    var userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    let id = socialMediaId
    console.log('id number', data)
    const linkedin = getValues('linkedinUrl')
    const facebook = getValues('fbUrl')
    const twitter = getValues('twitterUrl')
    let req = {
      id: id,
      company_name: userInfo.Company_Name,
      linkedin: linkedin,
      facebook: facebook,
      twitter: twitter,
    }
    await axios
      .put(`/socialmedia_update/${id}/`, req)
      .then((result) => {
        setSocialMedia(result.data)
        getDetialsMedia()
        alert('edited successfully')
        handleClose()
      })
      .catch((err) => {
        console.log('error resp', err)
      })
  }
  //=====================//
  const handleSocialMediaPopUp = () => {
    setSocialMediaPopUp(true)
  }

  //======================//
  //=============================//
  useEffect(() => {
    getDetialsMedia()
  }, [])
  //================//
  return (
    <>
      <div>
        <div className="row container">
          <div className="m-3"></div>{' '}
          <div className="card p-3">
            <div className="body">
              <div className="row borbottm">
                <div className="col-md-6">
                  <h6>SOCIAL PROFILE</h6>
                </div>
                <div className="col-md-6 text-end fns-w">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleSocialMediaPopUp()
                    }}
                  >
                    <AiOutlineEdit />
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  <div className="social-section">
                    <ul>
                      <li>
                        {' '}
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={socialMedia.linkedin}
                          target="_blank"
                        >
                          {' '}
                          <i className="fa fa-linkedin"> </i>{' '}
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={socialMedia.facebook}
                          target="_blank"
                        >
                          {' '}
                          <i className="fa fa-facebook"> </i>{' '}
                        </a>{' '}
                      </li>
                      <li>
                        {' '}
                        <a
                          className="btn-floating btn-small btn-li waves-effect waves-light"
                          href={socialMedia.twitter}
                          target="_blank"
                        >
                          {' '}
                          <i className="fa fa-twitter"></i>{' '}
                        </a>{' '}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          size="md"
          show={socialMediaPopUp}
          onHide={() => setSocialMediaPopUp(false)}
          className="text-center"
        >
          <Modal.Header closeButton></Modal.Header>
          <div>
            <div
            // onSubmit={handleSubmit(onUpdateSocialSubmit)}
            >
              <div className="row">
                <div className="col-md-1">
                  <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                    {' '}
                    <i className="fa fa-linkedin"> </i>{' '}
                  </Link>
                </div>
                <div className="col-md-7">
                  <div className="md-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter URL"
                      {...register('linkedinUrl', {})}
                      onKeyUp={(e) => {
                        trigger('linkedinUrl')
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-1">
                  <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                    {' '}
                    <i className="fa fa-facebook"> </i>
                  </Link>
                </div>
                <div className="md-form col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter URL"
                    {...register('fbUrl', {})}
                    onKeyUp={(e) => {
                      trigger('fbUrl')
                    }}
                  />
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-1">
                  <Link className="btn-floating btn-small btn-li waves-effect waves-light">
                    {' '}
                    <i className="fa fa-twitter"> </i>
                  </Link>
                </div>
                <div className="md-form col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter URL"
                    {...register('twitterUrl', {})}
                    onKeyUp={(e) => {
                      trigger('twitterUrl')
                    }}
                  />
                </div>
                <div className="text-center m-3">
                  <button
                    className="btn btn-secondary me-3 "
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <div
                    className="btn btn-secondary me-3 "
                    onClick={onUpdateSocialSubmit}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default SocialMedia
