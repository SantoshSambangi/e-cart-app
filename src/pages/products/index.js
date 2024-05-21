import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import Loader from "../../components/loader";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupAddRoundedIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// cards
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// modal
import Modal from "@mui/material/Modal";

const Products = () => {
    // base url:
    const baseUrl = "https://reqres.in/api";

    // states:
    const [showLoader, setShowLoader] = useState(false);
    const [usersData, setUsersData] = useState(null);
    const [userActionIndex, setUserActionIndex] = useState(null);
    const [individualUserData, setIndiviudalUserData] = useState(null);
    const [modal, setModal] = useState({ open: false, userData: null });
    const [editUserData, setEditUserData] = useState({
        firstname: "",
        lastname: "",
    });

    const userActionsData = [
        {
            icon: <PersonOutlineIcon />,
            color: "primary",
        },
        {
            icon: <GroupAddRoundedIcon />,
            color: "success",
        },
        {
            icon: <DeleteRoundedIcon />,
            color: "error",
        },
    ];

    const productContainerStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    };

    const headerBlockStyles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "8px 24px",
        gap: "24px",
        alignItems: "center",
        backgroundColor: "#1976d2",
    };

    const rightContentBlockStyles = {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
    };

    const userCardViewStyles = {
        display: "grid",
        flex: 1,
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "10px",
        padding: "20px",
    };

    const userProfileCardStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
    };

    const closeBtnStyles = {
        width: "fit-content",
        alignSelf: "flex-end",
        marginTop: "20px",
    };

    const deleteUserProfileBtnStyles = {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-end",
    };

    const editUserViewStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    };

    const closeAndEditBtnStyles = {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-end",
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleUserActions = (item, index) => {
        setUserActionIndex(index);

        switch (index) {
            case 0:
                getIndividualEmployeeData(item);
                break;

            case 1:
                setEditUserData({
                    firstname: item.first_name,
                    lastname: item.last_name,
                });
                setModal({ open: true, userData: item });
                break;

            case 2:
                setModal({ open: true, userData: item });
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        getAllEmployeesData();
    }, []);

    const getAllEmployeesData = async () => {
        try {
            setShowLoader(true);
            const url = `${baseUrl}/users`;
            const response = await axios.get(url);
            if (response.status === 200) {
                setShowLoader(false);
                setUsersData(response?.data?.data);
            } else {
                setShowLoader(false);
                setUsersData(null);
            }
        } catch (error) {
            setShowLoader(false);
            console.log("error", error);
        }
    };

    const getIndividualEmployeeData = async (userData) => {
        try {
            setShowLoader(true);
            const url = `${baseUrl}/users/${userData?.id}`;
            const response = await axios.get(url);
            if (response.status === 200) {
                setShowLoader(false);
                setIndiviudalUserData(response?.data?.data);
                setModal({ ...modal, open: true });
            } else {
                setShowLoader(false);
                setModal({ ...modal, open: false });
                setIndiviudalUserData(null);
            }
        } catch (error) {
            setShowLoader(false);
            console.log("error", error);
        }
    };

    const editUserProfileData = async (userData) => {
        const editProfileData = {
            first_name: editUserData.firstname,
            last_name: editUserData.lastname,
        };
        try {
            setShowLoader(true);
            const url = `${baseUrl}/users/${userData.id}`;
            const response = await axios.put(url, editProfileData);
            if (response.status === 200) {
                setShowLoader(false);
                setModal({ ...modal, open: false });
                setUsersData((prevUsersData) =>
                    prevUsersData.map((user) =>
                        user.id === userData.id
                            ? {
                                  ...user,
                                  first_name: editUserData.firstname,
                                  last_name: editUserData.lastname,
                              }
                            : user
                    )
                );
            } else {
                setShowLoader(false);
                setModal({ ...modal, open: true });
            }
        } catch (error) {
            setShowLoader(false);
            setModal({ ...modal, open: false });
            console.log("error", error);
        }
    };

    const deleteUserProfileData = async (id) => {
        try {
            setShowLoader(true);
            const url = `${baseUrl}/users/${id}`;
            const response = await axios.delete(url);
            if (response.status === 204) {
                setShowLoader(false);
                getAllEmployeesData();
                setModal({ ...modal, open: false });
            } else {
                setModal({ ...modal, open: true });
            }
        } catch (error) {
            setShowLoader(false);
            setModal({ ...modal, open: false });
            console.log("error", error);
        }
    };

    const renderHeaderSection = () => {
        return (
            <Box sx={headerBlockStyles}>
                <Typography variant="h5" sx={{ color: "white" }}>
                    Dashboard
                </Typography>
                <Box sx={rightContentBlockStyles}>
                    <IconButton
                        size="large"
                        aria-label="search"
                        color="inherit">
                        {/* <ShoppingCartIcon style={{ color: "#fff" }} /> */}
                        <LinearScaleIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="search"
                        color="inherit">
                        <AccountCircleIcon style={{ color: "#fff" }} />
                    </IconButton>
                </Box>
            </Box>
        );
    };

    const renderGetAllEmployeesDataSection = () => {
        return (
            <Box sx={userCardViewStyles}>
                {usersData?.map((item, index) => {
                    return (
                        <Card key={index}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={item?.avatar}
                                title={`${item?.first_name} ${item?.last_name}`}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div">
                                    {`${item?.first_name} ${item?.last_name}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary">
                                    {item?.email}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {userActionsData?.map((action, index) => {
                                    return (
                                        <IconButton
                                            size="large"
                                            color={action?.color}
                                            key={index}
                                            onClick={() => {
                                                handleUserActions(item, index);
                                            }}>
                                            {action?.icon}
                                        </IconButton>
                                    );
                                })}
                            </CardActions>
                        </Card>
                    );
                })}
            </Box>
        );
    };

    const renderModalSection = () => {
        return (
            <Modal
                open={modal.open}
                onClose={() => setModal({ ...modal, open: false })}>
                <Box sx={style}>
                    {userActionIndex === 0 && renderUserProfileSection()}
                    {userActionIndex === 1 && renderEditUserInfoSection()}
                    {userActionIndex === 2 && renderDeleteUserSection()}
                </Box>
            </Modal>
        );
    };

    const renderUserProfileSection = () => {
        return (
            <Box sx={userProfileCardStyles}>
                <Typography>
                    {`${individualUserData?.first_name} ${individualUserData?.last_name}`}
                </Typography>
                <Typography>{individualUserData?.email}</Typography>
                <img
                    src={individualUserData?.avatar}
                    alt={individualUserData?.first_name}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                    }}
                />
                <Button
                    variant="outlined"
                    sx={closeBtnStyles}
                    onClick={() => setModal({ ...modal, open: false })}>
                    Close
                </Button>
            </Box>
        );
    };

    const renderEditUserInfoSection = () => {
        const userData = modal.userData;
        return (
            <Box sx={editUserViewStyles}>
                <TextField
                    required
                    id="outlined-required"
                    label="firstname"
                    value={editUserData.firstname}
                    onChange={(e) =>
                        setEditUserData({
                            ...editUserData,
                            firstname: e.target.value,
                        })
                    }
                />
                <TextField
                    required
                    id="outlined-required"
                    label="lastname"
                    value={editUserData.lastname}
                    onChange={(e) =>
                        setEditUserData({
                            ...editUserData,
                            lastname: e.target.value,
                        })
                    }
                />
                <TextField
                    required
                    id="outlined-required"
                    value={userData?.email}
                    disabled={true}
                />
                <Box sx={closeAndEditBtnStyles}>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => setModal({ ...modal, open: false })}>
                        Close
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={() => editUserProfileData(modal.userData)}>
                        Edit
                    </Button>
                </Box>
            </Box>
        );
    };

    const renderDeleteUserSection = () => {
        const userName = modal.userData.first_name;
        return (
            <Box>
                <Typography>
                    Are you sure you want to delete {`${userName}'s profile`}?
                </Typography>
                <Box sx={deleteUserProfileBtnStyles}>
                    <Button
                        variant="contained"
                        sx={closeBtnStyles}
                        onClick={() => setModal({ ...modal, open: false })}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        sx={closeBtnStyles}
                        color="error"
                        onClick={() =>
                            deleteUserProfileData(modal?.userData?.id)
                        }>
                        Delete
                    </Button>
                </Box>
            </Box>
        );
    };

    return (
        <Box sx={productContainerStyles}>
            {showLoader && <Loader />}
            {renderHeaderSection()}
            <Typography variant="h3" alignSelf="center">
                Users
            </Typography>
            {renderGetAllEmployeesDataSection()}
            {renderModalSection()}
        </Box>
    );
};

export default Products;
