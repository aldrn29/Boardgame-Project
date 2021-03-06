import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    List,
    ListItemButton,
    ListSubheader,
    Box,
    Container,
    ListItemText,
    CssBaseline,
    Divider,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import * as Api from "../../api";

function Community() {
    const navigate = useNavigate();
    const [allContents, setAllContents] = useState(undefined);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchContentsInfo = async () => {
        try {
            const res = await Api.get("communitycontents");
            setAllContents(res.data);
            setIsFetchCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContentsInfo();
    }, []);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        marginTop: "60px",
                    }}
                >
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                        }}
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                            style={{
                                textAlign: "center",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{ fontSize: "1rem", fontWeight: "700" }}
                            >
                                자유게시판
                            </span>
                            <IconButton
                                onClick={() =>
                                    navigate("/communitycontents/create")
                                }
                            >
                                <BorderColorIcon />
                            </IconButton>
                        </ListSubheader>
                    </List>
                    <Divider />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>번호</TableCell>
                                    <TableCell align="center">제목</TableCell>
                                    <TableCell align="center">작성자</TableCell>
                                    <TableCell align="right">날짜</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allContents?.map((content, idx) => (
                                    <TableRow
                                        key={content.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/communitycontents/${content._id}`
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                        hover={true}
                                    >
                                        <TableCell component="th" scope="row">
                                            {idx}
                                        </TableCell>
                                        <TableCell align="center">
                                            {content.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {content.author}
                                        </TableCell>
                                        <TableCell align="right">
                                            {content.createdAt.slice(0, 10)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Community;
