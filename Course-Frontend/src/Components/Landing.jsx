import { Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Landing = () => {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState("")
    return <div>
        <Grid container style={{ padding: "5vw" }}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant="h2">
                        CourseApp Admin
                    </Typography>
                    <Typography variant="h5">
                        A place to learn, earn and grow
                    </Typography>
                    <div style={{ display: "flex", marginTop: 20 }}>
                        <div style={{ marginRight: 10 }}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
}