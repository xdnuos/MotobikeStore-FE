import React from 'react'
import { Button, LinearProgress, Grid, Stack, Typography, styled, Avatar, Paper } from '@mui/material'
import { Rate } from 'antd'
import Iconify from '../../../../components/iconify/Iconify';

const CustomLinearProgress = styled(LinearProgress)(() => ({
    backgroundColor: "#bcbfc2",
    width: "100%",
    borderRadius: "10px",
    ".MuiLinearProgress-bar": {
        backgroundColor: "#000000"
    },

}));

const TypographyWrapper = styled(Typography)({
    flex: "0 0 auto",
});

const renderReviewComment = () => {
    return (
        <Paper elevation={4} sx={{ mb: 3 ,p: 2,borderRadius: 2}}>
            <Stack direction="row" justifyContent={"space-between"}>
                <Stack direction="row" >
                    <Avatar sx={{ m: "4px 16px" }}>H</Avatar>
                    <span>

                        <Typography variant="subtitle2">
                            Tên người đăng
                        </Typography>
                        <Rate allowHalf disabled style={{ color: "#faaf00", fontSize: "16px" }} defaultValue={5} />
                        <Typography variant='body2'>Mua cái gì</Typography>
                    </span>
                </Stack>

                <Typography variant='body2'>ngày tháng</Typography>
            </Stack>

            <Typography variant='body1' py={1}>Lorem ipsum dolor sit amet. Est unde porro et rerum fuga ut temporibus nihil et quia harum ut rerum omnis aut quidem reprehenderit.
                Quo cupiditate magnam eum perspiciatis
                iusto est perspiciatis impedit sit aspernatur natus qui facere molestiae in voluptates corporis est illo odio. Ut dolor dolore a ipsum ipsum ea necessitatibus autem sed porro
                aperiam et neque consequuntur sit veritatis possimus. Sed ipsa excepturi At nesciunt deleniti eum deleniti odio non facere architecto.
            </Typography>
        </Paper>
    )
}
const Review = () => {
    return (
        <Grid container spacing={0}>
            <Grid
                item
                xs={6}
                md={4}
                sx={{
                    borderRight: "1px dashed lightgrey",
                    borderBottom: "1px dashed lightgrey",
                }}
            >
                <Stack alignItems="center" justifyContent="center" sx={{ height: "100%" }} >
                    <Typography variant='subtitle2'>Average rating</Typography>
                    <Typography variant='h2'>{"__"}/5</Typography>
                    <Rate allowHalf disabled style={{ color: "#faaf00" }} defaultValue={5} />
                    <Typography color="#808384" variant="body2" textAlign={"end"} sx={{ mt: 0.5 }} >
                        (9.12k reviews)
                    </Typography>
                </Stack>
            </Grid>
            <Grid
                item
                xs={6}
                md={4}
                sx={{ borderBottom: "1px dashed lightgrey" }}
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    p={3}
                    sx={{ height: "100%" }} >
                    <Stack direction={"row"} alignItems="center" width={"100%"} spacing={1} >
                        <TypographyWrapper variant='subtitle2'>5 Star</TypographyWrapper>
                        <CustomLinearProgress
                            variant="determinate"
                            value={30}
                        />
                        <TypographyWrapper variant='body2'>5K</TypographyWrapper>
                    </Stack>

                    <Stack direction={"row"} alignItems="center" width={"100%"} spacing={1} >
                        <TypographyWrapper variant='subtitle2'>4 Star</TypographyWrapper>
                        <CustomLinearProgress
                            variant="determinate"
                            value={50}
                        />
                        <TypographyWrapper variant='body2'>5K</TypographyWrapper>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" width={"100%"} spacing={1} >
                        <TypographyWrapper variant='subtitle2'>3 Star</TypographyWrapper>
                        <CustomLinearProgress
                            variant="determinate"
                            value={0}
                        />
                        <TypographyWrapper variant='body2'>5K</TypographyWrapper>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" width={"100%"} spacing={1} >
                        <TypographyWrapper variant='subtitle2'>2 Star</TypographyWrapper>
                        <CustomLinearProgress
                            variant="determinate"
                            value={10}
                        />
                        <TypographyWrapper variant='body2'>5K</TypographyWrapper>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" width={"100%"} spacing={1} >
                        <TypographyWrapper variant='subtitle2'>1 Star</TypographyWrapper>
                        <CustomLinearProgress
                            variant="determinate"
                            value={10}
                        />
                        <TypographyWrapper variant='body2'>5K</TypographyWrapper>
                    </Stack>
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    borderLeft: "1px dashed lightgrey",
                    borderBottom: "1px dashed lightgrey",
                }}
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    p={2}
                    sx={{ height: "100%" }}
                >
                    <Button sx={{ color: "#000", mt: 3, backgroundColor: "#f1f1f1", ":hover": { backgroundColor: "#dcdcdc" } }}>
                        <Iconify icon="solar:pen-bold" mr={1} />
                        Write your review
                    </Button>
                </Stack>
            </Grid>


            {false ?
                <Grid item xs={12}>

                    <Typography variant="subtitle1" textAlign={"center"} py={5}>

                        This product has no reviews yet<br />

                        Be the first to review this product
                    </Typography>

                </Grid> :
                <Grid item xs={12} p={3}>

                    {renderReviewComment()}

                    {renderReviewComment()}
                    {renderReviewComment()}
                    {renderReviewComment()}
                </Grid>
            }
        </Grid>
    )
}

export default Review