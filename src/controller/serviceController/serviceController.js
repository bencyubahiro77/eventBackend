import {Services, Category,Booking,User} from '../../database/models'



const getServices = async(req, res)=>{
    try {
        const service = await Services.findAll({
            include: Category
        });
        res.status(200).json({status:200, message:"Services retrieved", data:service});
    } catch (error) {
        res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
}

const addService = async(req,res)=>{
    try {
        const { CategoryId, title, date, location, ticketAvailability } = req.body;

        const service = await Services.create({
            CategoryId: CategoryId,
            title,
            date,
            location,
            ticketAvailability
        });
        res.status(200).json({status:200, message:"Service created", data:service});
    } catch (error) {
        res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
}

const deleteService = async(req, res)=>{
    const {id} = req.params;
    try {
       const service = await Services.findOne({where: {id}});
       if(!service){
        return res.json({ status: 404, message: "Service not found" });
       }
       const deletedService =  await Services.destroy({where:{id}, return:true});
       res.status(200).json({
        statusCode: 200,
        message:"Service deleted",
        data: deletedService,
      });
    } catch (error) {
        res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
}

const updateService = async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Services.findOne({ where: { id } });
      if (!service) {
        return res.json({ status: 404, message: "Service not found" });
      }
      const { category, title, date, location, ticketAvailability } = req.body;
      await Services.update({
        CategoryId: category,
        title,
        date,
        location,
        ticketAvailability
      }, { where: { id } });
      const updatedService = await Services.findOne({ where: { id } });
      res.status(200).json({
        statusCode: 200,
        message: "Event updated",
        data: updatedService,
      });
    } catch (error) {
      res.status(error.status).json({ status: error.status, message: error.message, data: [] });
    }
  }
  
  const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Services.findOne({ where: { id }, include: Category });
      if (!service) {
        return res.json({ status: 404, message: "service not found" });
      }
      res.status(200).json({ status: 200, message: "service retrieved", data: service });
    } catch (error) {
      res.status(error.status).json({ status: error.status, message: error.message, data: [] });
    }
  }

  const bookService = async (req, res) => {
    try {
      const { userId, serviceId, numberOfTicket } = req.body;
  
      // Check if userId, serviceId, and numberOfTicket are provided
      if (!userId || !serviceId || !numberOfTicket || numberOfTicket <= 0) {
        return res.status(400).json({ status: 400, message: 'Please provide valid userId, serviceId, and numberOfTicket' });
      }
      // Find the service
      const service = await Services.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ status: 404, message: 'Service not found' });
      }
  
      if (numberOfTicket > service.ticketAvailability) {
        return res.status(400).json({ status: 400, message: 'Not enough tickets available for booking' });
      }

      if (service.ticketAvailability === 0) {
        return res.status(400).json({ status: 400, message: 'booking sold out' });
      }

      await Services.decrement('ticketAvailability', { by: numberOfTicket, where: { id: serviceId } });
  
      await Booking.create({
        userId: userId,
        serviceId: serviceId,
        numberOfTicket: numberOfTicket
      });      
  
      return res.status(200).json({ status: 200, message: 'Service booked successfully'});
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  };
  
  const cancelBookedService = async (req, res) => {
    try {
      const { userId, id, userRole } = req.body; 
  
      // Find the booking
      const booking = await Booking.findOne({ where: { id } });
      if (!booking) {
        return res.status(404).json({ status: 404, message: 'Booking not found' });
      }
  
      // Check if the booking belongs to the user or if the user is an Admin
      if (booking.userId !== userId && userRole !== 'Admin') {
        return res.status(403).json({ status: 403, message: 'You are not authorized to cancel this booking' });
      }
  
      const service = await Services.findOne({ where: { id: booking.serviceId } });
      if (!service) {
        return res.status(404).json({ status: 404, message: 'Associated service not found' });
      }
  
      // Increase the ticket availability for the service
      await Services.increment('ticketAvailability', { by: booking.numberOfTicket, where: { id: service.id } });
  
      // Delete the booking
      await booking.destroy({ where: { id } });
  
      return res.status(200).json({ status: 200, message: 'Booking canceled successfully' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }  
    
  const getUserBookedService = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ status: 400, message: 'Please provide valid userId' });
      }
  
      const bookings = await Booking.findAll({
        where: { userId },
        include: {
          model: Services,
          attributes: ['id', 'title', 'date', 'location', 'ticketAvailability'],
        },
      });
  
      return res.status(200).json({ status: 200, data: bookings });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  };

  const getAllBookings = async (req, res) => {
    try {
      const allBookings = await Booking.findAll({
        include: [
          {
            model: Services,
            attributes: ['id', 'title', 'date', 'location', 'ticketAvailability'],
          },
          {
            model: User, // Include the User model
            attributes: ['username'], // Fetch the username attribute
          }
        ],
      });
      res.status(200).json({status:200, message:"Booking retrieved", data:allBookings});
    } catch (error) {
      res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
  }  

export default{getServices, addService, deleteService, updateService, getServiceById, bookService, cancelBookedService,getUserBookedService,getAllBookings}