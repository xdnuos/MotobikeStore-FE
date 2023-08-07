import PropTypes from 'prop-types';
import { Card, Stack, Typography, CardMedia, Link } from "@mui/material";
import { GlassCard } from "./style";
import Iconify from "../iconify/Iconify";

GlassCardComponent.propTypes ={
  dataTitle : PropTypes.array.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
}
function GlassCardComponent({dataTitle = [], title, content}) {
  return (
    <GlassCard>
      <Stack p={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Stack alignItems={'center'}>
          <Typography lineHeight={1}  variant="h3" >{title}</Typography>
          <Typography pt={1} variant="subtitle1" color="text.secondary">
           {content}
          </Typography>
        </Stack>
        {dataTitle.map((data, index) => (
          <Card key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>

            <CardMedia
              component="img"
              sx={{ width: '80px', height: '80px', mr: 2 }}
              image={data.img}
              alt="Live from space album cover"
            />
            <Stack >
              <Typography variant="h5">
              {data.title}
              </Typography>
              <Link href={data.href} underline="hover">
                <Typography variant="body1" component="div">
                  Tìm hiểu thêm
                  <Iconify icon="ic:round-navigate-next" sx={{ mb: -0.6 }} />
                </Typography>

              </Link>
            </Stack>

          </Card>
        ))}


      </Stack>
    </GlassCard>
  )
};

export default GlassCardComponent;
