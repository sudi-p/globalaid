import User from "../models/User.js";
import Ad, { Job, Rental } from "../models/Ad.js";
import Conversation, { Message } from "../models/Chat.js";

//getUser ✅
//getJobs ✅
//getRentals
//postAd ✅
//getMyAds ✅
//getMyAd ✅
//createJob ✅
//createRental
//uploadRentalPhotos

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const { firstName, lastName, email } = user;
    res.status(201).json({ firstName, lastName, email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Ad.find({ available: true, adType: "job" });
    res.status(201).json({ jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//getMyAds
export const getMyAds = async (req, res) => {
  try {
    let ads = await Ad.find({ user: req.user.id }).lean();
    // let ads = await Ad.find().lean();
    const newAdsPromise = ads.map(async (ad) => {
      try {
        const { _id: adId, title, adType, description } = ad;
        let isComplete;
        if (adType == "rent") {
          const rents = await Rental.find({ ad: adId });
          isComplete = rents.length > 0;
        } else {
          const jobs = await Job.find({ ad: adId });
          isComplete = jobs.length > 0;
        }
        return {
          ...ad,
          isComplete,
        };
      } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
      }
    });
    const newAds = await Promise.all(newAdsPromise)
    res.status(201).json({ ads: newAds });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//getMyAd
export const getMyAd = async (req, res) => {
  try {
    const ad = await Ad.findOne({ id: req.params.adId });
    res.status(201).json({ ad });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//createAd
export const createAd = async (req, res) => {
  try {
    let requestMethod = req.method;
    if (requestMethod === "GET") {
      const ad = await Ad.findOne({ _id: req.query.adId }).lean();
      const adType = ad.adType;
      let isComplete;
      if (adType == "rent") {
        const rent = Rental.findOne({ ad: ad._id });
        isComplete = rent.length > 0;
      } else {
        const job = Job.findOne({ ad: ad._id });
        isComplete = job.length > 0;
      }
      if (ad.available || isComplete)
        res.status(404).json({ message: "Unautorized Content" });
      else {
        let createAdLevel = 2;
        if (ad.adType === "rent") {
          const rent = await Rental.findOne({ ad: ad._id });
          if (rent) createRentalLevel = 3;
        }
        ad.createAdLevel = createAdLevel;
        res.status(201).json({ ad });
      }
    } else {
      const { title, description, adType } = req.body;
      const ad = new Ad({
        user: req.user.id,
        title,
        description,
        adType,
      });
      await ad.save();
      res.status(201).json({ ad, message: "Ad Posted" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//Create Job
export const createJob = async (req, res) => {
  try {
    const {
      adId,
      company,
      location,
      jobType,
      salary,
      jobSite,
      email,
      phone,
      isOwner,
    } = req.body;
    const jobs = await Job.find({ ad: adId });
    if (jobs.length > 0) {
      res.status(404).json({ message: "Unauthorized Access" });
    } else {
      const ad = await Ad.findByIdAndUpdate(
        adId,
        {
          location,
          email,
          phone,
          available: true,
        },
        { new: false }
      );
      const job = new Job({
        ad,
        company,
        isOwner,
        jobType,
        salary,
        jobSite,
      });
      await job.save();
      res.status(201).json({ jobId: job._id, message: "Job Published" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
//Create Rentals
//Upload Rental Photos

//getRentals
export const getRentals = async (req, res) => {
  try {
    const rentals = [
      {
        id: "63f45ba2631adf1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        price: 2000,
        images: [
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/76900a54-e2ed-435e-9dd4-6d9b702149cd.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/ae4fa65c-749d-41a7-920f-6956eab4c138.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/e12e3117-3e56-4f7c-888a-761165979e2d.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/8e3e4e55-83e1-4e03-b2f9-89c86b0bdcb9.webp",
        ],
        priceNegotiable: false,
        hydroIncluded: true,
        heatInclude: true,
        waterIncluded: true,
        wifiIncluded: true,
        location: "7 Aragon Ave",
        city: "Toronto",
        postedDate: "2022-12-27",
        type: "Basement",
        bedrooms: 2,
        bathrooms: 1,
        parking: true,
        agreementType: "1 Year",
        moveInDate: "2023-01-01",
        petFriendly: true,
        size: "800sq ft",
        furnished: true,
        laundry: true,
        dishwasher: true,
        fridge: true,
        airConditioning: true,
        smoking: true,
        description:
          "A perfect 2 bedroom apartment for students studying in Loyalist College",
      },
      {
        title: "1 Bedroom Hall Kitchen Apartment for rent",
        images: [
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/63ea1b50-a3a1-4bea-a2f4-e5338e795807.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/e6f3dca3-ba8d-4e21-b02d-b905e038ecc8.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/24f8cb50-c017-44ed-ac4a-c6d6b0633e55.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/1bbe2c32-89e2-4027-bf52-c2a37bd30ba9.webp",
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415230/GlobalAid/rentals/rental2/4851d25c-9755-433a-b0dd-d3ea6c1feae7.webp",
        ],
        price: 2000,
        priceNegotiable: false,
        hydroIncluded: false,
        heatInclude: false,
        waterIncluded: false,
        wifiIncluded: false,
        location: "7 Aragon Ave",
        city: "Scarborough",
        postedDate: "2022-12-27",
        type: "Basement",
        bedrooms: 2,
        bathrooms: 1,
        parking: false,
        agreementType: "1 Year",
        moveInDate: "2023-01-01",
        petFriendly: true,
        size: "800sq ft",
        furnished: false,
        laundry: false,
        dishwasher: false,
        fridge: false,
        airConditioning: false,
        smoking: false,
        description:
          "A perfect 2 bedroom apartment for students studying in Loyalist College",
      },
    ];
    return res.status(201).json({ rentals });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: { $in: [req.user.id] } })
      .populate('ad')
      .populate('participants')
      .populate('lastMessage')
      .populate('lastMessage.sender')
      .populate('lastMessage.receipient')
    const chatsPromise = conversations.map(async (conversation) => {
      let { lastMessage, ad, _id:chatId } = conversation;
      lastMessage = await lastMessage.populate(['sender', 'recipient'])
      const { sender, recipient} = lastMessage;
      let client;
      if (lastMessage.sender._id.toString() === req.user.id){
        client = `${recipient.firstName} ${recipient.lastName}`;
      } else {
        client = `${sender.firstName} ${sender.lastName}`
      }
      return {
        'title': ad.title,
        'lastMessage': lastMessage.content,
        'client':  client,
        chatId,
      }
      
    })
    const chats = await Promise.all(chatsPromise)
    return res.status(201).json(chats)
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

export const getIndividualChat = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id }).populate('ad').populate('participants');
    const messages = await Message.find({ conversation: conversation._id })
      .populate('sender')
      .populate('recipient')
      .sort({ createdAt: 1 });
    let messageList = [];
    const client = conversation.participants.find(
      participant => participant._id.toString() !== req.user.id
    )
    messages.map(message => {
      const content = message.content;
      const createdAt = message.createdAt;
      const sender = req.user.id === message.sender._id.toString();
      const senderName = `${message.sender.firstName} ${message.sender.lastName}`;
      messageList.push({
        content, createdAt, senderName, sender, messageId: message._id
      });
    })
    const data = {
      'ad': conversation.ad.title,
      'location': conversation.ad.location,
      client,
      messageList
    }
    return res.status(201).json({ ...data })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ msg: error.message })
  }
}
