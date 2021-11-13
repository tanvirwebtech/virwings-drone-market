import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const columns = [
    { id: "productId", label: "Product Id", minWidth: 170 },
    { id: "name", label: "User's Name", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 100 },
    {
        id: "phone",
        label: "Phone",
        minWidth: 80,
        align: "right",
    },
    {
        id: "email",
        label: "Email",
        minWidth: 170,
        align: "right",
    },
    {
        id: "status",
        label: "Order Status",
        minWidth: 170,
        align: "right",
    },
    {
        id: "action",
        label: "Action",
        minWidth: 170,
        align: "right",
    },
];

const ManageAllOrders = () => {
    const [orders, setOrders] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [targetId, setTargetId] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        fetch(
            `https://nameless-lowlands-17762.herokuapp.com/orders/${targetId}`,
            {
                method: "DELETE",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const rest = orders.filter((order) => order._id !== targetId);
                setOrders(rest);
                setTargetId("");
            });
        setOpen(false);
    };

    React.useEffect(() => {
        fetch(`https://nameless-lowlands-17762.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);
    const handleDelete = (id) => {
        handleClickOpen();
        setTargetId(id);
    };
    return (
        <>
            <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={columns.length}
                                >
                                    My Orders
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            top: 57,
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row._id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === "action" ? (
                                                        <Button
                                                            color="secondary"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    row._id
                                                                )
                                                            }
                                                        >
                                                            {" "}
                                                            Delete
                                                        </Button>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            backgroundColor: "#fff",
                            borderRadius: 0,
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are You Sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Make sure you are doing right. This action can't be
                            undone!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleConfirm}
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default ManageAllOrders;
