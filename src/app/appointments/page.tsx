'use client'
import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '@fontsource/eb-garamond'; // Importa a fonte

interface Appointment {
  id: string;
  nome: string;
  email: string;
  data: string;
  quantidade: number;
  horario: string;
  nomeMuseu: string;
  createdAt: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'edit' | 'delete' | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) {
          throw new Error('Erro ao buscar agendamentos');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleEditClick = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDialogType('edit');
    setOpenDialog(true);
  };

  const handleDeleteClick = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDialogType('delete');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingAppointment(null);
  };

  const handleUpdate = async () => {
    if (editingAppointment) {
      try {
        const response = await fetch(`/api/appointments/${editingAppointment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingAppointment),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar o agendamento');
        }

        const updatedAppointment = await response.json();
        setAppointments(appointments.map(app => (app.id === updatedAppointment.id ? updatedAppointment : app)));
        handleDialogClose();
      } catch (error) {
        console.error('Erro ao atualizar o agendamento:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (editingAppointment) {
      try {
        const response = await fetch(`/api/appointments/${editingAppointment.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o agendamento');
        }

        setAppointments(appointments.filter(app => app.id !== editingAppointment.id));
        handleDialogClose();
      } catch (error) {
        console.error('Erro ao excluir o agendamento:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <main id="main">
    <Box p={3} sx={{ fontFamily: 'EB Garamond' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#d4af37', fontFamily: 'EB Garamond, serif' }}>
        Meus Agendamentos
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2, border: '1px solid #d4af37' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Horário</TableCell>
              <TableCell>Nome do Museu</TableCell>
              <TableCell>Criado Em</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.nome}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{new Date(appointment.data).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.quantidade}</TableCell>
                <TableCell>{appointment.horario}</TableCell>
                <TableCell>{appointment.nomeMuseu}</TableCell>
                <TableCell>{new Date(appointment.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="text" 
                    onClick={() => handleEditClick(appointment)} 
                    sx={{ color: '#d4af37', marginRight: 1 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'black')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#d4af37')}
                  >
                    <ModeEditIcon />
                  </Button>
                  <Button 
                    variant="text" 
                    onClick={() => handleDeleteClick(appointment)} 
                    sx={{ color: '#d4af37' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'black')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#d4af37')}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'edit' ? 'Editar Agendamento' : 'Excluir Agendamento'}</DialogTitle>
        <DialogContent>
          {dialogType === 'edit' ? (
            <Box>
              {editingAppointment && (
                <>
                  <TextField
                    label="Nome"
                    value={editingAppointment.nome}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, nome: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    value={editingAppointment.email}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, email: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Data"
                    type="date"
                    value={new Date(editingAppointment.data).toISOString().split('T')[0]}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, data: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Quantidade"
                    type="number"
                    value={editingAppointment.quantidade}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, quantidade: Number(e.target.value) })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Horário"
                    type="time"
                    value={editingAppointment.horario}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, horario: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Nome do Museu"
                    value={editingAppointment.nomeMuseu}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, nomeMuseu: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
            </Box>
          ) : (
            <Typography>
              Tem certeza de que deseja excluir este agendamento?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: '#d4af37' }}>
            Cancelar
          </Button>
          {dialogType === 'edit' && (
            <Button onClick={handleUpdate} sx={{ color: '#d4af37' }}>
              Salvar
            </Button>
          )}
          {dialogType === 'delete' && (
            <Button onClick={handleDelete} sx={{ color: '#d4af37' }}>
              Excluir
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
    </main>
  );
}
