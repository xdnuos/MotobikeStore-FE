// SECTIONS SẢN PHẨM THEO ĐỐI TƯỢNG
// ---------------------------------------------------------------
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Chip, Stack, Typography } from '@mui/material'
import Iconify from '../../../components/iconify/Iconify'
import { ProductList } from '../products'
import { useState } from 'react'
import { tagService } from '../../../services/tagService'
import { set } from 'lodash'
import { useNavigate } from 'react-router-dom'
// ---------------------------------------------------------------


const filterByChip = [
    { key: 0, label: 'Trẻ em' },
    { key: 1, label: 'Người cho con bú ' },
    { key: 2, label: 'Phụ nữ cao tuổi' },
];
// ---------------------------------------------------------------

function ProductsByTag({product = [], limit }) {

    const [activeChip, setActiveChip] = useState(null);
    const [products, setProducts] = useState(product);
    const [tags, setTags] = useState([]);
    const [originalProducts, setOriginalProducts] = useState(product);
    const [selectedTags, setSelectedTags] = useState('');
const navigate = useNavigate();


    useEffect(() => {
        tagService.getAllTags().then((res) => {
            setTags(res.data);

        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleChipClick = (index, name) => {
        setActiveChip(index);
        
        if (index === 0) {
            setProducts(originalProducts);
            setSelectedTags("");
        } else {
            const filteredProducts = originalProducts.filter(item =>
                item?.tags?.includes(name)
            );
            setProducts(filteredProducts);setSelectedTags(name);
        }
    };

    return (
        <Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2} mb={2}
            >
                <Typography variant='h4' >
                    <Iconify icon="streamline:money-cashier-tag-codes-tags-tag-product-label" sx={{ mr: 2, color: '#fff', background: '#1565c0', borderRadius: "50%" }} />
                    {selectedTags !==  '' ? selectedTags : 'All products'}
                </Typography>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Typography variant='subtitle1' sx={{ mr: 3, color: "primary" }}>Filter by: </Typography>
                    <Chip
                            key={0}
                            label={"All"}
                            clickable
                            onClick={() => handleChipClick(0)}
                            color={
                                activeChip === 0 || (0 === 0 && true && !activeChip)
                                    ? 'primary'
                                    : 'default'
                            }
                        />
                    {tags?.slice(0, 4).map((data, index) => (
                        <Chip
                            key={index + 1}
                            label={data?.name}
                            clickable
                            onClick={() => handleChipClick(index + 1, data?.name)}
                            color={
                                activeChip === index + 1
                                    ? 'primary'
                                    : 'default'
                            }
                        />
                    ))}
                </Stack>
            </Stack>
            <ProductList products={products} limit={limit} />

            {products?.length - 1 - limit > 0 && (
                
                  <Stack justifyContent={"center"}>
                    <Button
                      sx={{ color: "#000", mt: 3 }}
                      onClick={() => navigate("/list-products")}
                    >
                      Show more {products?.length - 1 - limit} products
                      <Iconify icon="mingcute:right-fill" ml={1} />
                    </Button>
                  </Stack>
                
              )}
        </Stack>
    )
}

ProductsByTag.propTypes = {
    products: PropTypes.array.isRequired,
    limit: PropTypes.number,
}

export default ProductsByTag
