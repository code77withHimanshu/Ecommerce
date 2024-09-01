import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductUpdateForm from './ProductUpdateForm';

const ProductUpdateModal = ({ open, onClose, productId }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <ProductUpdateForm productId={productId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductUpdateModal;
