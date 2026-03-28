package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Home;
import com.example.portfolio_editor_backend.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final HomeRepository repository;

    private Home getOrCreateHome() {
        List<Home> homeList = repository.findAll();
        if (homeList.isEmpty()) {
            Home newHome = new Home();
            newHome.setCommands(new ArrayList<>());
            newHome.setInterests(new ArrayList<>());
            newHome.setLinks(new ArrayList<>());
            return repository.save(newHome);
        }
        return homeList.get(0);
    }

    // Commands
    public List<Home.Command> getCommands() {
        return getOrCreateHome().getCommands();
    }

    public Home.Command addCommand(Home.Command command) {
        Home home = getOrCreateHome();
        home.getCommands().add(command);
        repository.save(home);
        return command;
    }

    public void deleteCommand(String cmd) {
        Home home = getOrCreateHome();
        home.getCommands().removeIf(c -> c.getCmd().equals(cmd));
        repository.save(home);
    }

    // Interests
    public List<Home.Interest> getInterests() {
        return getOrCreateHome().getInterests();
    }

    public Home.Interest addInterest(Home.Interest interest) {
        Home home = getOrCreateHome();
        home.getInterests().add(interest);
        repository.save(home);
        return interest;
    }

    public void deleteInterest(String text) {
        Home home = getOrCreateHome();
        home.getInterests().removeIf(i -> i.getText().equals(text));
        repository.save(home);
    }

    // Links
    public List<Home.Link> getLinks() {
        return getOrCreateHome().getLinks();
    }

    public Home.Link addLink(Home.Link link) {
        Home home = getOrCreateHome();
        home.getLinks().add(link);
        repository.save(home);
        return link;
    }

    public void deleteLink(String label) {
        Home home = getOrCreateHome();
        home.getLinks().removeIf(l -> l.getLabel().equals(label));
        repository.save(home);
    }
}
