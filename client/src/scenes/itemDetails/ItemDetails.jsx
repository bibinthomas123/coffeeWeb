import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [value, setValue] = useState("integrent");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px  auto 0 auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="0px">
          <img
            alt={item?.name}
            width="100%"
            height="50%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="0px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography
              sx={{
                mt: "20px",
                maxWidth: "100%", // Set the maximum width to 100% of the parent container
                overflowWrap: "break-word", // Enable word wrapping
              }}
            >
              {item?.attributes?.shortDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
                "&:hover": {
                  // Use &:hover to define hover styles
                  backgroundColor: "#fff9",
                  color: "#000", // Use "#ffff" for white color
                },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
          </Box>

          {/* INFORMATION */}
          <Box m="20px 0">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="INTEGRENTS" value="integrent" />
              <Tab label="REVIEWS" value="reviews" />
            </Tabs>
          </Box>
          <Box display="flex" flexWrap="wrap" gap="15px">
            {value === "integrent" && <div>{item?.attributes?.integrent}</div>}
            {value === "reviews" && <div>reviews</div>}
          </Box>
        </Box>
      </Box>

      {/* RELATED ITEMS */}
      {/* <Box mt="0px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box> */}
    </Box>
  );
};

export default ItemDetails;
