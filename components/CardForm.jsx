import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography,
  Paper,
  Grid,
  Container
} from "@mui/material";
import { Image } from "@mui/icons-material";

/**
 *
 * @param {cardValue} Object
 * @param {onSubmitForm} Function
 */
export default function CardForm({ cardValue, onSubmitForm }) {
  // const [cardValue, setCardValue] = useState(card);
  const [cardCategory, setCardCategory] = useState(cardValue?.category);
  if (!cardValue) {
    return null;
  }
  const img = "https://m.media-amazon.com/images/I/51skd-tjunL._AC_.jpg";
  console.log("cardValue", cardValue);
  const conditionVariants = cardCategory => {
    if (cardCategory === "Sport Card") {
      return ["near mint", "excellent", "very good", "poor"];
    } else {
      return ["near mint", "lightly played", "moderately played", "heavily played", "damaged"];
    }
  };
  const handleSubmit = async e => {
    console.log("e.target.elements", e.target.elements);
    const {
      imageURL,
      category,
      cardName,
      set,
      price,
      currency,
      shippingCost,
      description,
      conditions,
      quantity,
      available
    } = e.target.elements;
    onSubmitForm({
      imageURL: imageURL.value,
      category: category.value,
      name: cardName.value,
      set: set.value,
      price: price.value,
      currency: currency.value,
      shippingCost: shippingCost.value,
      description: description.value,
      conditions: conditions.value,
      quantity: quantity.value,
      available: available.value
    });
  };
  return (
    <Container>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={2}
        gap={2}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}>
        <Typography textAlign="center" variant="h4">
          {cardValue ? "Edit" : "Add"} card
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
                sx={{ overflow: "hidden", aspectRatio: "3/4" }}>
                <Image alt="no image" fontSize="large" color="secondary" />
                <Typography sx={theme => ({ color: theme.palette.text.secondary })}>Click Choose File </Typography>
                <Typography sx={theme => ({ color: theme.palette.text.secondary })}> to upload image</Typography>
              </Paper>
              <TextField
                fullWidth
                name="imageURL"
                // label="image URL"
                defaultValue={cardValue?.imageURL}
              />
              {/* <TextField variant="standard" type="file" name="cardName" accept="image/png, image/jpeg, image/jpg" /> */}
            </Box>
          </Grid>
          <Grid item xs>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl required fullWidth size="small">
                <InputLabel id="cardCategory">category</InputLabel>
                <Select
                  fullWidth
                  name="category"
                  labelId="cardCategory"
                  id="category"
                  label="category"
                  defaultValue={cardValue?.category}
                  onChange={e => {
                    e.preventDefault();
                    setCardCategory(e.target.value);
                  }}>
                  <MenuItem value="Magic">Magic</MenuItem>
                  <MenuItem value="Pokemon">Pokemon</MenuItem>
                  <MenuItem value="Digimon">Digimon</MenuItem>
                  <MenuItem value="Yu-Gi-Oh!">Yu-Gi-Oh!</MenuItem>
                  <MenuItem value="Sport Card">Sport Card</MenuItem>
                </Select>
              </FormControl>
              <TextField required fullWidth name="cardName" label="name" defaultValue={cardValue?.name} />
              <TextField fullWidth name="set" label="set" defaultValue={cardValue?.set} />
              <TextField
                required
                fullWidth
                name="price"
                type="number"
                inputProps={{
                  step: 0.01
                }}
                label="price"
                defaultValue={cardValue?.price}
              />
              <FormControl required fullWidth size="small">
                <InputLabel id="cardCurrency">currency</InputLabel>
                <Select
                  fullWidth
                  name="currency"
                  labelId="cardCurrency"
                  id="currency"
                  label="currency"
                  defaultValue={cardValue?.currency}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="CAD">CAD</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                name="shippingCost"
                type="number"
                inputProps={{
                  step: 0.01
                }}
                label="shipping cost"
                defaultValue={cardValue?.shippingCost}
              />
              <TextField
                fullWidth
                name="description"
                multiline
                rows={3}
                defaultValue={cardValue?.description}
                label="description"
              />
              <FormControl required fullWidth size="small">
                <InputLabel id="conditions">condition</InputLabel>
                <Select
                  fullWidth
                  name="conditions"
                  labelId="conditions"
                  id="conditions"
                  label="conditions"
                  defaultValue={cardValue?.conditions}>
                  {conditionVariants(cardCategory).map((condition, index) => (
                    <MenuItem key={index} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                name="quantity"
                type="number"
                label="quantity"
                defaultValue={cardValue?.quantity}
              />
              <FormControl required fullWidth size="small">
                <InputLabel id="availableCard">available</InputLabel>
                <Select
                  fullWidth
                  name="available"
                  labelId="availableCard"
                  id="available"
                  label="available"
                  defaultValue={cardValue?.available}>
                  <MenuItem value="available">available</MenuItem>
                  <MenuItem value="sold">sold</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="secondary" type="submit">
                {cardValue ? "Edit" : "Add"} card
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
