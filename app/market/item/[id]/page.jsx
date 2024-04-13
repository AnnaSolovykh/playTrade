
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Card, CardActionArea, CardMedia, Breadcrumbs, Divider, Link, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import { fetchCardData } from "@/utils/fetchData";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Page({ params }) {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const router = useRouter();
  const id = params.id;

  // Function to convert currency code to symbol
  const getCurrencySymbol = (currencyCode) => {
    const currencySymbols = {
      USD: "$",
      CAD: "CA$",
    };
    return currencySymbols[currencyCode] || currencyCode;
  };


  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const cardData = await fetchCardData(id);
          setCardDetails(cardData);
        } catch (error) {
          console.error(error);
          setOpenError(true);
          setErrorMessage(error.toString() || "unknown error");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleWishlistButtonClick = () => {
    router.push(`/sell/wishlist/${id}`);
  }; // will add this route later

  // const handleSellerInfoButtonClick = sellerId => {
  //   router.push(`/market/seller/${sellerId}`);
  // }; will add this route later

  const handleAddToCartButtonClick = () => {
    router.push("/cart");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ marginLeft: theme.spacing(2) }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "8px" }}>
          <Link color="inherit" href="/" onClick={() => router.push("/")}>
            Home
          </Link>
          <Typography color="text.primary">Card Details</Typography>
        </Breadcrumbs>

        {/* Image and Details Section */}
        <Box style={{ display: "flex", marginTop: theme.spacing(2) }}>
          {/* Image Section */}
          {cardDetails && (
            <Card style={{ boxShadow: "none", marginRight: theme.spacing(2) }}>
              <CardActionArea type="button" onClick={() => router.push(`/market/item/${cardDetails.id}`)}>
                <CardMedia
                  component="img"
                  image={cardDetails.imageURL}
                  alt={cardDetails.name}
                  style={{ width: 300, height: "auto" }}
                />
              </CardActionArea>
            </Card>
          )}


          {/* Details Section */}

          {cardDetails && (
            <Box style={{ maxWidth: 600, paddingLeft: theme.spacing(2), borderRadius: theme.shape.borderRadius }}>
              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ flex: 1 }}>
                  {cardDetails && (
                    <Link
                      href={`/market/seller/${cardDetails.sellerId}`}
                      underline="none"
                      sx={{
                        color: "accent.main",
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSellerInfoButtonClick(cardDetails.sellerId);
                      }}
                    >
                      Visit seller's page
                    </Link>

                  )}
                </span>
              </Typography>


              <Typography variant="h4" gutterBottom>
                {cardDetails.name}
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Price:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>
                  {getCurrencySymbol(cardDetails.currency)}
                  {cardDetails.price}
                </span>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Description:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.description}</span>
              </Typography>

              <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Conditions:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.conditions}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Category:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.category}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Quantity:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.quantity}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Availability:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.available}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Set:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.set}</span>
              </Typography>

              <Typography variant="body1" gutterBottom style={{ display: "flex" }}>
                <span style={{ width: 120, marginRight: 40 }}>
                  <Typography component="span" variant="subtitle1" style={{ fontWeight: "bold" }}>
                    Shipping Cost:
                  </Typography>
                </span>
                <span style={{ flex: 1 }}>{cardDetails.shippingCost}</span>
              </Typography>

              {/* Action Buttons */}
              <Box style={{ marginTop: theme.spacing(2), display: "flex", gap: theme.spacing(2) }}>
                <Button
                  variant="contained"
                  color="accent"
                  onClick={handleAddToCartButtonClick}
                  style={{ color: theme.palette.background.paper }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to cart
                </Button>

                <Button variant="contained" color="primary" onClick={handleWishlistButtonClick}>
                  Add to Wishlist
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};