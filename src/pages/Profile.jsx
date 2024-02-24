import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import axios from 'axios'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/Profile.css"
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Profile = ({ currentUser }) => {

    const user = useAppSelector((state) => state.user)
    const [loading, setLoading] = useState(true)
    const [listLength, setListLength] = useState(0)
    const [image, setImage] = useState(user.data.image ? user.data.image : null)

    const navigate = useNavigate()

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const getUserData = async () => {
        setLoading(true)
        const res = await axios.post("http://localhost:3500/user/getuser", {
            username: user.data.username
        })
            .then((data) => {
                console.log(data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let base64 = await convertToBase64(e.target.files[0])
        setImage(base64)
        try {
            const formData = new FormData();
            formData.append("profileImg", e.target.files[0]);
            axios
                .post("http://localhost:3500/user/uploadImage", formData, {})
                .then(async (res) => {
                    console.log(res.data)
                    axios.post("http://localhost:3500/user/imgdatabase", {
                        email: user.data.email,
                        image: base64
                    })
                        .then((res2) => {
                            console.log(res2.data)
                        })
                        .catch((err2) => {
                            console.log(err2)
                        })
                });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        document.title = "Profile"
        if (user.data.photo !== "") setImage(user.data.photo)
        getUserData()
    }, [, user])

    useEffect(() => {

    }, [user])

    useEffect(() => {
        if (!user.isLoggedIn) navigate('/user/login')
    }, [])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            {loading ?
                <>
                    <Loader />
                </>
                :
                <>
                    <Navbar />
                    <div class="profile_main-div">
                        <div class="main_profilepage">
                            <div class="profile-header">
                                <div class="profile-data">
                                    <img src={image} height="100px" class="dp" />
                                    <div class="profile-metadata">
                                        <div class="profile-name"> {user?.data?.username} </div>
                                        <form encType='multipart/form-data' onSubmit={handleSubmit}>
                                            {/* <input type="file" name="avatar" onChange={async (e) => { await handleSubmit(e) }}></input> */}
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="outlined"
                                                tabIndex={-1}
                                                name="avatar"
                                                onChange={async (e) => { await handleSubmit(e) }}
                                            >
                                                Upload avatar
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                        </form>
                                        {!currentUser ?
                                            <button class="followButton">FOLLOW</button>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                                <div class="profile-social-metadata">
                                    <div class="social-component">
                                        <div class="social-component-counter">  {user?.data?.watched?.length} </div>
                                        <a onClick={() => navigate("/user/watchedfilms")}>films</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {listLength} </div>
                                        <a onClick={() => navigate("/user/list")}>lists</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {user?.data?.following?.length} </div>
                                        <a onClick={() => navigate("/following/" + user?.data?.username?.split("%20").join(" "))}>following</a>
                                    </div>
                                    <div class="social-component">
                                        <div class="social-component-counter"> {user?.data?.followers?.length} </div>
                                        <a onClick={() => navigate("/followers/" + user?.data?.username?.split("%20").join(" "))}>followers</a>
                                    </div>
                                </div>
                            </div>
                            <div class="select-section">
                                <div class="profile_nav-link">
                                    <a onClick={() => navigate("/user/profile")} class="section-name  active">profile</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a onClick={() => navigate("/user/watchedfilms")} class="section-name">watched films</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a onClick={() => navigate("/user/watchlist")} class="section-name">watchlist</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a onClick={() => navigate("/user/list")} class="section-name">list</a>
                                </div>
                                <div class="profile_nav-link">
                                    <a onClick={() => navigate(`/followers/${user.data.username}`)} class="section-name">network</a>
                                </div>
                            </div>

                            <div class="profile_section-heading">favorite films</div>
                            {user?.data?.favourites?.length === 0 ?
                                <p style={{ color: "white" }}>No favourites added yet!</p>
                                :
                                <></>
                            }
                            <div class="profile_grid-container">
                                {/* <% for (let i=0; i<data.favourites.length; i++) { %> */}
                                {user?.data?.favourites?.map((item) => (
                                    <div className="grid-img-container" key={item.id}>
                                        <a onClick={() => navigate(`/film/${item.id}`)}>
                                            <img
                                                className="grid-img"
                                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                                alt="image"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div class="profile_section-heading">recently watched</div>
                            {user?.data?.watched?.length === 0 ?
                                <p style={{ color: "white" }}>No movies added to watched yet!</p>
                                :
                                <></>
                            }
                            <div class="profile_grid-container">
                                {user?.data?.watched?.slice(0, Math.min(user?.data?.watched?.length, 6)).map((item) => (
                                    <div className="grid-img-container" key={item.id}>
                                        <a onClick={() => navigate(`/film/${item.id}`)}>
                                            <img
                                                className="grid-img"
                                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                                alt="image"
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Profile