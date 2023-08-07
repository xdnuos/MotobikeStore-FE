// SECTIONS Góc Sức KHỎE
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Link, Stack, Typography } from '@mui/material'
import { BlogPostCard } from '../blog'
import Iconify from '../../../components/iconify/Iconify'

function BlogReview({ title, blog = [], limit }) {
    return (
        <Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2} m={2}
            >
                <Typography variant='h4' >
                    <Iconify icon="fluent-mdl2:page-list-mirrored-solid" sx={{ p: 0.1, mr: 1.5, color: '#fff', background: '#1565c0', borderRadius: "50%" }} />
                   {title}
                </Typography>
                <Link underline="hover" href='/blog'>
                    <Typography variant="subtitle1"  >
                        Xem Tất Cả
                    </Typography>
                </Link>
            </Stack>
            <Grid container spacing={3}>
                {blog.slice(0, limit).map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                ))}
            </Grid>


        </Stack>
        )
}

BlogReview.propTypes = {
    title: PropTypes.string,
    blog: PropTypes.array.isRequired,
    limit: PropTypes.number,
}

export default BlogReview
