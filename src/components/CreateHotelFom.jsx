import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCreateHotelMutation } from "@/lib/api";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
//run time validation
const formSchema = z.object({
  name: z.string().min(2,{
    message: "Hotel Name is required",
  }),
  location: z.string().min(3),
  image: z.string().min(3),
  price: z.number().min(2),
  description: z.string().min(3)
});



const CreateHotelForm = () =>{
    const [createHotel, {isLoading}]  =  useCreateHotelMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const handleSubmit = async (values) =>{
        
        const {name, location, image, price, description} = values;
        try {
            toast.loading("Creating hotel...");
           await createHotel({
                name,
                location,
                image,               
                price,
                description,
               }).unwrap();
              toast.success("Hotel created successfully");
        } catch (error) {
            toast.error("Hotel created unsuccessfully");
        }
            
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-1/2">
            <div className="grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Hotel Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="Image" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Price"  onChange={(e) =>{
                                    field.onChange(parseFloat(e.target.value));
                            }}value ={field.value } />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea  placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="mt-4">
            <Button type="submit">Create Hotel</Button>
            </div>
          
        </form>
      </Form>
    )
};

export default CreateHotelForm;