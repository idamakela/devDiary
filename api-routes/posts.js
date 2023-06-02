import supabase from '../lib/supabaseClient';

export const getPosts = async () => {
    //Handle get all posts
    const { data, error, status } = await supabase.from('Posts').select('*');

    // if (error) {
    //     console.log(error);
    // }

    return { data, error, status };
};

export const addPost = async (post) => {
    //Handle add post here
    const { error, status } = await supabase.from('Posts').insert({ post });

    return { error, status };
};

export const removePost = async (id) => {
    //Handle remove post here
    const { error, status } = await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

    return { error, status };
};

export const editPost = () => {
    //Handle edit post here
};
