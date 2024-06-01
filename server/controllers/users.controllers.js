import User from "../models/User.models.js";
import Ad, { Job, Rental, RentalImage } from "../models/Ad.models.js";
import Conversation, { Message } from "../models/Chat.models.js";

import uploadImagesToCloudinary from "../cloudinary.js";

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

    let loggedInUser;
    if (req.isAuthenticated) {
      loggedInUser = req.user;
    }
    const ads = await Ad.find(filter).populate("user").lean();
    let data = await Promise.all(
      ads.map(async (ad) => {
        try {
          const job = await Job.findOne({ ad: ad }).lean();
          if (!job) {
            throw new Error("Job not found");
          }
          const { company, jobType, jobSite } = job;
          console.log("Hello", loggedInUser);
          const adOwner = ad.user;
          const { firstName, lastName } = adOwner;
          return {
            ...ad,
            postedBy: `${firstName} ${lastName}`,
            company,
            jobType,
            jobSite,
            isOwner: ad.user == loggedInUser,
          };
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
    if (!ad) res.sendStatus(404);
    if (!ad.complete) return res.sendStatus(401);
    const adType = ad.adType;
    if (adType == "job") {
      const job = await Job.findOne({ ad: ad._id }).lean();
      if (!job) throw new Error("Job Not Found");
      ad = { ...ad, ...job };
    } else {
      const rental = await Rental.findOne({ ad: ad._id }).lean();
      if (!rental) return res.status(404).json({ message: "Rental not found" });
      const rentalImages = await RentalImage.find({
        rental: rental._id,
      }).lean();
      let images = rentalImages.map((img) => img.url);
      ad = { ...ad, ...rental, images };
    }
    res.status(201).json({ ad });
  } catch (err) {
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
export const skipUploadRentalImages = async (req, res) => {
  try {
    const { adId } = req.body;
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        complete: true,
      },
      { new: false }
    );
    if (!ad) res.status(404).json({ message: "Ad not found" });
    else res.status(201).json({ message: "Rental Published" });
  } catch (err) {
    res.sendStatus(500);
  }
};

//Upload Rental Photos
export const uploadRentalImages = async (req, res) => {
  try {
    const { adId, images } = req.body;
    const urls = await uploadImagesToCloudinary(images);
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        complete: true,
      },
      { new: false }
    );
    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }
    const rental = await Rental.find({ ad: adId });
    if (!rental) {
      return res.status(404).json({ msg: "Rental not found" });
    }
    for (const url of urls) {
      const rentalImage = new RentalImage({ rental: rental[0]._id, url: url });
      await rentalImage.save();
    }
    return res.status(201).json({ msg: "Photos Uploaded" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// postMessage
export const postMessage = async (req, res) => {
  try {
    const { adId, messageText } = req.body;
    if (!adId || !messageText) return res.sendStatus(400);
    const loggedInUser = req.user;
    let ad = await Ad.find({ _id: adId });
    if (!ad) return res.sendStatus(404);
    console.log(ad[0]);
    console.log("Hello", loggedInUser, ad[0].user);
    if (ad[0].user === loggedInUser) return res.sendStatus(400);
    const conversation = new Conversation({
      ad: adId,
      client: loggedInUser,
    });
    const message = new Message({
      conversation: conversation._id,
      sender: loggedInUser,
      content: messageText,
    });
    message.save();
    conversation.lastMessage = message;
    conversation.save();
    return res.status(201).json({ msg: "Message Sent" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { chatId, chatText } = req.body;
    if (!chatId || !chatText) return res.sendStatus(404);
    const conversations = await Conversation.find({ _id: chatId }).populate(
      "ad"
    );
    if (!conversations) return res.sendStatus(404);
    const conversation = conversations[0];
    const {
      ad: { user: adUser },
    } = conversation;
    console.log("Hello", adUser, loggedInUser);
    const message = new Message({
      conversation,
      sender: loggedInUser,
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

//Get Chats
export const getChats = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const conversations = await Conversation.find({
      participants: { $in: [req.user.id] },
    })
      .populate("ad")
      .populate("client")
      .populate("lastMessage");

    const chatsPromise = conversations.map(async (conversation) => {
      let { _id: chatId, lastMessage, ad, client } = conversation;
      const { user: adUser, title } = ad;
      const clientName =
        client == loggedInUser
          ? `${adUser.firstName} ${adUser.lastName}`
          : `${client.firstName} ${client.lastName}`;
      return {
        title: title,
        lastMessage: lastMessage.content,
        client: clientName,
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
    const { chatId } = req.query;
    if (!chatId) return res.sendStatus(404);
    let conversation = await Conversation.find({ _id: chatId })
      .populate("ad")
      .populate("client")
      .lean();
    if (!conversation) return res.sendStatus(404);
    conversation = conversation[0];
    const { ad, client } = conversation;
    const messages = await Message.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });
    let messageList = [];
    let tempDate = new Date(2021 / 12 / 12);
    messages.map((message) => {
      const { content, sender, createdAt } = message;
      const lastMessageDuration = Math.abs(
        (tempDate - createdAt) / (1000 * 60 * 60 * 24)
      );
      console.log(lastMessageDuration);
      const isMyMessage = sender == req.user;
      const senderName = `${sender.firstName} ${sender.lastName}`;
      const messageObject = {
        content,
        senderName,
        isMyMessage,
        messageId: message._id,
      };
      if (lastMessageDuration > 1) {
        let date = createdAt.toISOString().split("T")[0];
        if (Math.abs(createdAt - new Date()) / (1000 * 60 * 60 * 24) <= 1)
          date = "Today";
        messageObject.createdAt = date;
        tempDate = createdAt;
      }
      messageList.push(messageObject);
    });
    const data = {
      ad: conversation.ad.title,
      location: conversation.ad.location,
      client,
      messageList,
    };
    return res.status(201).json({ ...data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};
