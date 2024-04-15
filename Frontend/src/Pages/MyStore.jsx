import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Box, Heading, Input, FormControl, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const EditModal = ({ isOpen, onClose, item, handleEdit }) => {
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description || '');
  const [newPrice, setNewPrice] = useState(item.price || '');

  const handleSubmit = () => {
    const newData = {
      name: newName,
      description: newDescription,
      price: newPrice
    };
    handleEdit(item.id, newData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {item.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <Input placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </FormControl>
          {item.description && (
            <FormControl mb={4}>
              <Input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </FormControl>
          )}
          {item.price && (
            <FormControl mb={4}>
              <Input placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MyStore = () => {
  const [showCategories, setShowCategories] = useState(true); // Initially show categories
  const [categoryData, setCategoryData] = useState([
    { id: 1, name: 'Category 1', description: 'Description 1' },
    { id: 2, name: 'Category 2', description: 'Description 2' },
    { id: 3, name: 'Category 3', description: 'Description 3' },
  ]);
  const [productData, setProductData] = useState([
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleShowCategories = () => {
    setShowCategories(true);
  };

  const handleShowProducts = () => {
    setShowCategories(false);
  };

  const handleAdd = () => {
    if (showCategories) {
      const newCategory = {
        id: categoryData.length + 1,
        name: newItemName,
        description: newItemDescription,
      };
      setCategoryData([...categoryData, newCategory]);
      setNewItemName('');
      setNewItemDescription('');
    } else {
      const newProduct = {
        id: productData.length + 1,
        name: newItemName,
        price: newItemPrice,
      };
      setProductData([...productData, newProduct]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleEdit = (id, newData) => {
    if (showCategories) {
      const updatedCategories = categoryData.map(category => {
        if (category.id === id) {
          return { ...category, ...newData };
        }
        return category;
      });
      setCategoryData(updatedCategories);
    } else {
      const updatedProducts = productData.map(product => {
        if (product.id === id) {
          return { ...product, ...newData };
        }
        return product;
      });
      setProductData(updatedProducts);
    }
  };

  const handleDelete = (id, type) => {
    if (type === 'category') {
      const updatedCategories = categoryData.filter(category => category.id !== id);
      setCategoryData(updatedCategories);
    } else {
      const updatedProducts = productData.filter(product => product.id !== id);
      setProductData(updatedProducts);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  return (
    <Box p={8}>
      <Heading as="h1" textAlign="center" mb={8} size="2xl">My Store</Heading>
      <Flex justify="center" mb={8}>
        <Button colorScheme="teal" variant={showCategories ? "solid" : "outline"} onClick={handleShowCategories} mr={2}>Categories</Button>
        <Button colorScheme="teal" variant={!showCategories ? "solid" : "outline"} onClick={handleShowProducts}>Products</Button>
      </Flex>
      <Table variant="striped" colorScheme="teal" borderWidth="1px">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>{showCategories ? 'Description' : 'Price'}</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {showCategories ? (
            <>
              {categoryData.map(category => (
                <Tr key={category.id}>
                  <Td>{category.id}</Td>
                  <Td>{category.name}</Td>
                  <Td>{category.description}</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm" mr={2} onClick={() => openEditModal(category)}>Edit</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(category.id, 'category')}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </>
          ) : (
            <>
              {productData.map(product => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm" mr={2} onClick={() => openEditModal(product)}>Edit</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(product.id, 'product')}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </>
          )}
          <Tr>
            <Td></Td>
            <Td>
              <FormControl>
                <Input placeholder="Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              </FormControl>
            </Td>
            <Td>
              {showCategories ? (
                <FormControl>
                  <Input placeholder="Description" value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)} />
                </FormControl>
              ) : (
                <FormControl>
                  <Input placeholder="Price" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} />
                </FormControl>
              )}
            </Td>
            <Td>
              <Button colorScheme="green" size="sm" onClick={handleAdd}>Add</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      {editingItem && (
        <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} item={editingItem} handleEdit={handleEdit} />
      )}
    </Box>
  )
}

export default MyStore;
