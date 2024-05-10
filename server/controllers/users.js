import User from "../models/User.js";
import Ad, { Job, Rental } from "../models/Ad.js";
import Conversation, { Message } from "../models/Chat.js";

import algoliasearch from "algoliasearch";

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
    console.log(
      process.env.ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_API_KEY
    );
    const { firstName, lastName, email } = user;
    res.status(201).json({ firstName, lastName, email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopRentalsJobs = async (req, res) => {
  try {
    const topRentals = [
      {
        id: "63f45ba2631adf1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 2500,
        image:
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/76900a54-e2ed-435e-9dd4-6d9b702149cd.webp",
      },
      {
        id: "63f45ba2631adfg1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 1000,
        image:
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/ae4fa65c-749d-41a7-920f-6956eab4c138.webp",
      },
      {
        id: "63f45ba2ertv1adf1b0a35b94f",
        title: "2 Bedroom Hall Kitchen Apartment for rent",
        rent: 3500,
        image:
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/e12e3117-3e56-4f7c-888a-761165979e2d.webp",
      },
      {
        id: "63f45ba234rfadf1b0a35b94f",
        title: "1 Bedroom Hall Kitchen Apartment for rent",
        rent: 2800,
        image:
          "https://res.cloudinary.com/dtqxwjmwn/image/upload/v1674415211/GlobalAid/rentals/rental1/8e3e4e55-83e1-4e03-b2f9-89c86b0bdcb9.webp",
      },
    ];
    const topJobs = [
      {
        id: "63f45ba2631adf1b0a35b94f",
        title: "Cleaner",
        salary: 16,
        location: "Toronto",
        description:
          "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time",
      },
      {
        id: "63f45ba2631adfg1b0a35b94f",
        title: "Waiter",
        salary: 17,
        location: "Toronto",
        description:
          "This position is responsible for cleaning and sanitizing processing equipment in a safe manner.",
        jobType: "part-time",
      },
      {
        id: "63f45ba2ertv1adf1b0a35b94f",
        title: "Bairsta",
        salary: 20,
        location: "Toronto",
        description:
          "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time",
      },
      {
        id: "63f45ba234rfadf1b0a35b94f",
        title: "Host",
        salary: 25,
        location: "Toronto",
        description:
          "We are seeking professional Waiter / Waitress with fine dining experience. This is a very important role for us and we rely heavily on our serving staff. They manage the pulse of the dining room and ensure patrons have a memorable dining experience.",
        jobType: "part-time",
      },
    ];
    return res.status(201).json({ topJobs, topRentals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    let filter = { available: true, adType: "job" };
    if (req.isAuthenticated) {
      filter.user = req.user;
    }
    const ads = await Ad.find(filter);
    let data = await Promise.all(
      ads.map(async (ad) => {
        try {
          const job = await Job.findOne({ ad: ad });
          if (!job) {
            throw new Error("Job not found");
          }
          const { company } = job;
          return { ...ad.toObject(), company };
        } catch (error) {
          return null;
        }
      })
    );
    data = data.filter((job) => job !== null);
    res.status(201).json({ ads: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

//getMyAds
export const getMyAds = async (req, res) => {
  try {
    let ads = await Ad.find({ user: req.user }).lean();
    res.status(201).json({ ads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getMyAd
export const getMyAd = async (req, res) => {
  try {
    const { adId } = req.query;
    let ad = await Ad.findOne({ _id: adId }).lean();
    if (!ad) res.sendStatus(401);
    if (!ad.complete) return res.sendStatus(401);
    const adType = ad.adType;
    if (adType == "job") {
      const job = await Job.findOne({ ad: ad._id }).lean();
      if (!job) throw new Error("Job Not Found");
      ad = { ...ad, ...job };
    } else {
      const rental = await Rental.findOne({ ad: ad._id }).lean();
      if (!rental) throw new Error("Rental Not Found");
      ad = { ...ad, ...rental };
    }
    res.status(201).json({ ad });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
//createAd
export const getCreateAd = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.query.adId }).lean();
    if (ad.complete) throw new Error("Unauthorized Access");
    const adType = ad.adType;
    let createAdLevel = 1;
    if (adType === "rent") {
      const rental = await Rental.findOne({ ad: ad._id });
      if (rental) createAdLevel = 2;
    }
    ad.createAdLevel = createAdLevel;
    res.status(201).json({ ad });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const postAd = async (req, res) => {
  try {
    const { title, description, adType } = req.body;
    if (!adType in ["job", "rental"]) res.sendStatus(401);
    const ad = new Ad({
      user: req.user,
      title,
      description,
      adType,
    });
    await ad.save();
    res.status(201).json({ ad, message: "Ad Posted" });
  } catch (err) {
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
    if (jobs.length > 0) res.status(401);
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        location,
        email,
        phone,
        complete: true,
        available: true,
      },
      { new: false }
    );

    const client = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_API_KEY
    );
    const index = client.initIndex("jobs");
    const record = {
      company: company,
      isOwner: isOwner,
      jobType: jobType,
      jobSite: jobSite,
      salary: salary,
      objectID: adId,
      location: location,
      email: email,
      phone: phone,
      complete: true,
      available: true,
    };
    await index.saveObject(record).wait();
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//Create Rentals
export const createRental = async (req, res) => {
  try {
    const {
      adId,
      bedRoom,
      washRoom,
      rent,
      rentalType,
      isOwner,
      email,
      phone,
      location,
    } = req.body;
    const rentals = await Rental.find({ ad: adId });
    if (rentals.length > 0) res.sendStatus(401);
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        location,
        email,
        phone,
      },
      { new: false }
    );
    const rental = new Rental({
      ad: ad,
      rent,
      bedRoom,
      washRoom,
      rentalType,
      isOwner,
    });
    await rental.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Skip Upload Rental Photos
export const skipUploadRentalPhotos = async (req, res) => {
  try {
    const { adId } = req.body;
    console.log("adId", adId);
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        complete: true,
      },
      { new: false }
    );
    console.log(ad);
    if (!ad) res.status(404).json({ message: "Ad not found" });
    else res.status(201).json({ message: "Rental Published" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

//Upload Rental Photos

export const getChats = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user.id] },
    })
      .populate("ad")
      .populate("participants")
      .populate("lastMessage")
      .populate("lastMessage.sender")
      .populate("lastMessage.receipient");
    const chatsPromise = conversations.map(async (conversation) => {
      let { lastMessage, ad, _id: chatId } = conversation;
      lastMessage = await lastMessage.populate(["sender", "recipient"]);
      const { sender, recipient } = lastMessage;
      let client;
      if (lastMessage.sender._id.toString() === req.user.id) {
        client = `${recipient.firstName} ${recipient.lastName}`;
      } else {
        client = `${sender.firstName} ${sender.lastName}`;
      }
      return {
        title: ad.title,
        lastMessage: lastMessage.content,
        client: client,
        chatId,
      };
    });
    const chats = await Promise.all(chatsPromise);
    return res.status(201).json(chats);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getIndividualChat = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })
      .populate("ad")
      .populate("participants");
    const messages = await Message.find({ conversation: conversation._id })
      .populate("sender")
      .populate("recipient")
      .sort({ createdAt: 1 });
    let messageList = [];
    const client = conversation.participants.find(
      (participant) => participant._id.toString() !== req.user.id
    );
    messages.map((message) => {
      const content = message.content;
      const createdAt = message.createdAt;
      const sender = req.user.id === message.sender._id.toString();
      const senderName = `${message.sender.firstName} ${message.sender.lastName}`;
      messageList.push({
        content,
        createdAt,
        senderName,
        sender,
        messageId: message._id,
      });
    });
    const data = {
      ad: conversation.ad.title,
      location: conversation.ad.location,
      client,
      messageList,
    };
    return res.status(201).json({ ...data });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    const { chatId, chatText } = req.body;
    const conversation = await Conversation.findOne({ _id: chatId }).populate(
      "participants"
    );
    const participants = conversation.participants;

    const recipient = participants.find(
      (participant) => participant._id.toString() !== req.user.id
    );
    const sender = participants.find(
      (participant) => participant._id.toString() === req.user.id
    );
    const message = new Message({
      conversation,
      sender,
      recipient,
      content: chatText,
    });
    message.save();
    conversation.lastMessage = message;
    conversation.save();
    return res.status(201).json({ msg: "message sent" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
