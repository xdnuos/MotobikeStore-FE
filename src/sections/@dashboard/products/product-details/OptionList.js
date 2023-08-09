import { useState } from 'react';
import { styled, List, ListItem, ListItemText, Typography, Stack } from '@mui/material';


const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
    border: `1px solid ${selected ? theme.palette.primary.main : 'gray'}`,
    borderRadius: 5,
    width:'30%',
    padding: '0 22px 0 15px',
    backgroundColor: selected ? theme.palette.primary.main : 'transparent',
    color: selected ? 'text.secondary' : 'inherit',
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.main : '#f5f5f5',
    },
    '& .MuiListItemText-primary': {
        fontWeight: selected ? 'bold' : 'normal',

    },
}));

const StyledTick = styled(Typography)(({ theme }) => ({
    display: 'inline-block',
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    borderRadius: '0 10% 0 100%',
    borderBottom: `28px solid transparent`,
    borderRight: `28px solid ${theme.palette.primary.main}`,
    position: 'absolute',

    transformOrigin: '100% 0%',
    "&::before": {
        content: '""',
        display: 'block',
        width: 5,
        height: 10,
        borderBottom: `2px solid ${theme.palette.background.default}`,
        borderRight: `2px solid ${theme.palette.background.default}`,
        transform: 'rotate(45deg)',
        transformOrigin: '180% 260%',
    },
}));



export default function OptionList( props) {
    const [selectedIndex, setSelectedIndex] = useState(props.data?.length - 1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List>
            <Stack direction="row" justifyContent="flex-end"
                alignItems="center"
                spacing={2}>

                {props.data?.map((option, index) => (

                    <StyledListItem
                        key={index}
                        button
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                    >

                        <ListItemText primary={option.name} />
                        {selectedIndex === index && <StyledTick />}

                    </StyledListItem>

                ))}</Stack>
        </List>
    );
}




// export default OptionList;