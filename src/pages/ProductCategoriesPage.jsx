import { Add as AddIcon } from "@mui/icons-material"
import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import RequireLogin from "../components/RequireLogin"

export default function ProductCategoriesPage() {
  const [categoriasList, setCategoriasList] = useState([])
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`/categorias_produto`).then(response => setCategoriasList(response.data))
  }, [])

  return (
    <>
      <RequireLogin />
      <Typography variant="h4" gutterBottom>
        Categorias de Produtos
      </Typography>
      <TextField fullWidth
          label="Pesquise por uma categoria"
          type="search"
          variant="standard"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      <Box sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriasList
                .filter(categoria => categoria.nome.toUpperCase().includes(searchText.toUpperCase()))
                .map(categoria => (
                  <TableRow
                    key={categoria.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { cursor: 'pointer' }
                    }}
                    onClick={() => navigate(`/produtos/categorias/${categoria.id}`)}
                  >
                    <TableCell component="th" scope="row">{categoria.id}</TableCell>
                    <TableCell align="right">{categoria.nome}</TableCell>
                    <TableCell align="right">{categoria.descricao}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ '& > :not(style)': { m: 1 } }} className="flex justify-end">
          <Tooltip title="Criar produto" onClick={() => navigate('/produtos/categorias/novo')}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
    </>
  )
}