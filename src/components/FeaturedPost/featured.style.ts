import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';


export const GridComments = styled(Grid)`
    padding: 20px;
    text-align: initial;
    background: #ececec;
`;

export const TextUser = styled.h3`
    text-align: initial;
    margin:0px;
    
`;

export const CustomButton = styled(Button)`
    background: #FFFFFF;
    text-transform: capitalize;
`;

export const GridLink = styled(Grid)`
    justify-content: space-around;
`;

export const CardActionAreaCustom = styled(CardActionArea)`
    height: auto;
`;

export const CardCustom = styled(Card)`
    border-radius: 0%; 
    border-bottom: 0px;
    display: flex;
    height: 250px;
`;